from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
import nest_asyncio
import asyncio

# Appliquer nest_asyncio pour gérer les boucles d'événements dans Flask
nest_asyncio.apply()

# Charger les variables d'environnement
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configurer Google Generative AI
from google import generativeai as genai
genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)
CORS(app)  # Activer CORS pour tester avec Postman

# Initialisation globale
faiss_index_path = "./BackEnd/RAG2/faiss_index"  # Chemin vers l'index FAISS

# Fonction pour initialiser le modèle Google Generative AI
async def initialize_model():
    return ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

# Fonction pour charger l'index FAISS
def load_vector_db():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    return FAISS.load_local(faiss_index_path, embeddings, allow_dangerous_deserialization=True)

# Fonction pour créer la chaîne de traitement des questions
def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details. 
    If the answer is not in the provided context, just say, "answer is not available in the context", 
    don't provide a wrong answer.\n\n
    Context:\n {context}\n
    Question: \n{question}\n

    Answer:
    """
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    model = loop.run_until_complete(initialize_model())
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    return load_qa_chain(model, chain_type="stuff", prompt=prompt)

# Initialisation globale
db = load_vector_db()
chain = get_conversational_chain()

@app.route('/chat', methods=['POST'])
def ask():
    try:
        # Extraire la question de l'utilisateur
        data = request.json
        user_question = data.get("input", "")
        if not user_question:
            return jsonify({"error": "No question provided."}), 400
        
        # Rechercher des documents similaires dans la base de données vectorielle
        docs = db.similarity_search(user_question)
        if not docs:
            return jsonify({"error": "No relevant documents found."}), 404

        # Obtenir une réponse à l'aide de la chaîne de questions-réponses
        response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
        return jsonify({"response": response["output_text"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=8080)