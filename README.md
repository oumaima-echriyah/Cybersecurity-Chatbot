# Combining Diffusion Models and Language Understanding Models in a Cybersecurity Chatbot with Advanced Retrieval-Augmented Generation (RAG) Using a Microservices Architecture in a DevOps/MLOps Context

## Introduction
This project aims to enhance cybersecurity through a chatbot powered by Diffusion Models and Language Understanding Models. By integrating Advanced Retrieval-Augmented Generation (RAG) and utilizing a microservices architecture in a DevOps/MLOps context, we aim to provide an efficient, scalable, and intelligent chatbot solution for real-time cybersecurity threat management.

Key components of the project include:
- Diffusion Models for advanced generative capabilities.
- Language Understanding Models for effective user interaction.
- Retrieval-Augmented Generation (RAG) to improve response relevance.
- Microservices architecture for modularity and scalability.
- DevOps/MLOps practices for continuous integration, delivery, and deployment.

## Tasks Completed by Team Members

### Oumaima Echriyah
**Roles:** LLMs Responsible, Backend Developer, Frontend Developer

**LLMs Responsible:**
- Developed a **Retrieval-Augmented Generation (RAG)** system specifically for cybersecurity topics.
- Collected PDF datasets related to cybersecurity from trusted sources.
- Utilized **Python** for RAG system development.
- Integrated **Gemini** as the Language Model and **FAISS** as the Vector Database.
- Ensured accurate data indexing and retrieval.
- Key Functions for RAG:
    - `initialize_model`: Initializes the Gemini model with a specified configuration.
    - `load_vector_db`: Loads the FAISS vector database for similarity searches.
    - `get_conversational_chain`: Creates a conversational chain with predefined prompts.
    - `ask`: Handles user queries, retrieves relevant data, and generates responses.
![Successful Initialization of Vector Store in RAG System](assets/vectorstore.PNG)


**Backend Developer:**
- Developed a **Flask API** for seamless interaction with the RAG system.
![Successful Initialization of Vector Store in RAG System](assets/flask-api-test..PNG)



**Frontend Developer:**
- Developed an Angular-based **chat interface** for the cybersecurity chatbot.
    ![Successful Initialization of Vector Store in RAG System](chat-interface.PNG)

- Enabled users to ask cybersecurity-related questions interactively.
  ![Successful Initialization of Vector Store in RAG System](assets/load-response.PNG)
  ![Successful Initialization of Vector Store in RAG System](assets/response-security-bot.PNG)
- Ensured clear error handling for queries unrelated to the cybersecurity dataset.
- Designed a user-friendly interface similar to modern chatbot designs.


### Ouassim Assoufi
*Details to be added.*

### Hicham Fassali
*Details to be added.*

### Abghouni Amal
*Details to be added.*

## Conclusion
This project successfully combines cutting-edge technologies like Diffusion Models, Language Understanding Models, and Retrieval-Augmented Generation (RAG) to create a cybersecurity chatbot that can effectively respond to real-time threats. The use of a microservices architecture ensures scalability, while the adoption of DevOps/MLOps practices enables smooth deployment and continuous improvement. Our next steps include refining the models, improving the chatbot's ability to understand complex cybersecurity issues, and optimizing its integration with live systems.


