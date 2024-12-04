# app.py
from flask import Flask, request, jsonify
from chat import get_pdf_text, get_text_chunks, get_vector_store, user_input
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Endpoint pour télécharger les fichiers PDF et traiter le texte
@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({'error': 'No files part in the request'}), 400

    files = request.files.getlist('files')
    if not files:
        return jsonify({'error': 'No files provided'}), 400

    # Traiter les fichiers PDF
    try:
        raw_text = get_pdf_text(files)
        text_chunks = get_text_chunks(raw_text)
        get_vector_store(text_chunks)
        return jsonify({'message': 'Files processed successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint pour poser des questions
@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    user_question = data.get('question', '')

    if not user_question:
        return jsonify({'error': 'No question provided'}), 400

    try:
        response = user_input(user_question)
        return jsonify({'response': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True,port=7000)
