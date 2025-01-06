from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Chemin fixe pour le dossier contenant les fichiers PDF
FOLDER_PATH = "C:/Users/pc razen 5/Desktop/Cybersecurity Chatbot/BackEnd/RAG2/data"

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

# Fonction principale pour initialiser les données
def initialize_data():
    if not os.path.isdir(FOLDER_PATH):
        print(f"Error: The folder path '{FOLDER_PATH}' does not exist.")
        return

    print("Processing PDF files from folder:", FOLDER_PATH)
    raw_text = get_pdf_text_from_folder(FOLDER_PATH)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    print("Data initialized successfully. The vector store has been saved.")

if __name__ == "__main__":
    initialize_data()
