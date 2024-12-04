from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Chemin fixe pour le dossier contenant les fichiers PDF
FOLDER_PATH = "C:/Users/pc razen 5/Desktop/Oumaima_Echriyah_FSTT_SITBD_3_1_PFA_2024_3dsf/BackEnd/RAG2/data"

# Fonction pour extraire le texte des fichiers PDF
def get_pdf_text_from_folder(folder_path):
    text = ""
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(folder_path, filename)
            pdf_reader = PdfReader(pdf_path)
            for page in pdf_reader.pages:
                text += page.extract_text()
    return text

# Fonction pour diviser le texte en morceaux
def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

# Fonction pour créer et sauvegarder une base de données vectorielle
def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

# Fonction pour créer la chaîne de traitement des questions
def get_conversational_chain():
    # Modèle de prompt pour les questions-réponses
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """
    # Initialiser le modèle de langage
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    
    # Créer le prompt pour la chaîne de questions-réponses
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return chain

# Fonction pour traiter la question de l'utilisateur et obtenir une réponse
def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    # Charger la base de données vectorielle
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    # Rechercher des documents similaires
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()
    response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)

    return response["output_text"]

# Fonction principale pour l'interface utilisateur dans le terminal
def main():
    if not os.path.isdir(FOLDER_PATH):
        print(f"Error: The folder path '{FOLDER_PATH}' does not exist.")
        return

    print("Processing PDF files from folder:", FOLDER_PATH)
    raw_text = get_pdf_text_from_folder(FOLDER_PATH)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    print("PDF files processed successfully. You can now ask questions!")

    while True:
        user_question = input("\nAsk a question (or type 'exit' to quit): ")
        if user_question.lower() == 'exit':
            print("Goodbye!")
            break
        response = user_input(user_question)
        print(f"Answer: {response}")

if __name__ == "__main__":
    main()
