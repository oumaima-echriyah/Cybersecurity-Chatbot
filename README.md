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
  
![flask](assets/flask-api-test..PNG)



**Frontend Developer:**
- Developed an Angular-based **chat interface** for the cybersecurity chatbot.

  ![chat interface](assets/chatInterface.PNG)

- Enabled users to ask cybersecurity-related questions interactively.
  
  ![response](assets/load-response.PNG)
  ![response2](assets/response-security-bot.PNG)
  
- Ensured clear error handling for queries unrelated to the cybersecurity dataset.

    ![response2](assets/outOfContext.PNG)

- Designed a user-friendly interface similar to modern chatbot designs.


Here's a detailed version of your roles and contributions:

---

### Ouassim Assoufi  

**Roles:** DevOps Responsible, CI/CD Responsible, Monitoring Responsible  



**DevOps Engineer:**  
- **Dockerization:**  
  - Built **Docker Images** for the Flask backend and Angular frontend and run them as containers, ensuring consistent and portable environments.
  -  ![response2](assets/angular-app.png)
 
  - ![response2](assets/flask-appcontainer.png)
  - Wrote **Dockerfiles** for both applications, including dependencies and build instructions.  

- **Kubernetes Deployment:**  
  - Created **Kubernetes pods** for the Flask backend and Angular frontend, deploying them within a **Minikube cluster**.  
  - Developed **Deployment YAML files** for Flask and Angular with a **replica count of 2** to ensure high availability and fault tolerance.  
  - Configured **Service YAML files** using the **LoadBalancer** service type to expose the applications to external traffic.  
  - Validated deployments by checking pod status, endpoints, and ensuring services were reachable externally.  



**CI/CD Specialist:**  
- **Jenkins Pipeline:**  
  - Designed and implemented a **Jenkins pipeline** to automate the entire build, test, and deployment lifecycle.  
  - Authored a **Jenkinsfile** to:  
    - Clone the **GitHub repository** containing the Flask and Angular source code.  
    - Build Docker images for both applications.  
    - Push the Docker images to a container registry (if used).  
    - Deploy the pods into the **Minikube cluster** using `kubectl` commands or configuration files.  

- Streamlined development and deployment workflows, reducing manual intervention and ensuring faster iteration cycles.  

---

**Monitoring Lead:**  
- **Prometheus Integration:**  
  - Configured **Prometheus** to scrape metrics from the Kubernetes cluster, focusing on:  
    - Resource utilization (CPU, memory) of Flask and Angular pods.  
    - Service availability and health.  
    - Cluster-wide metrics like node status and resource allocation.  

- **Grafana Visualization:**  
  - Set up **Grafana dashboards** for real-time visualization of system performance.  
  - Created custom panels to monitor:  
    - Flask and Angular pod metrics.  
    - Cluster resource usage.  
    - Alerts for potential issues like pod restarts, high resource consumption, or service downtimes.  

- Ensured continuous monitoring, enabling proactive issue detection and resolution.  

---

This version adds technical details to highlight your contributions and expertise in a professional and precise manner. Let me know if you'd like any further modifications!


### Hicham Fassali
*Details to be added.*

### Abghouni Amal
*Details to be added.*

## Conclusion
This project successfully combines cutting-edge technologies like Diffusion Models, Language Understanding Models, and Retrieval-Augmented Generation (RAG) to create a cybersecurity chatbot that can effectively respond to real-time threats. The use of a microservices architecture ensures scalability, while the adoption of DevOps/MLOps practices enables smooth deployment and continuous improvement. Our next steps include refining the models, improving the chatbot's ability to understand complex cybersecurity issues, and optimizing its integration with live systems.


