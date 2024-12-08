pipeline {
    agent any
    
    environment {
        DOCKERHUB_USERNAME = credentials('ouassim012')
        DOCKERHUB_PASSWORD = credentials('Czju7848@')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/oumaima-echriyah/Cybersecurity-Chatbot']])
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                }
            }
        }
        
        stage('Build Docker image for Angular') {
            steps {
                script {
                    // Build Docker image for Angular
                    sh 'docker build -t cybersecurity/frontend-app Frontend'
                }
            }
        }

        stage('Push Angular image to Docker Hub') {
            steps {
                script {
                    // Push Angular Docker image to Docker Hub
                    sh 'docker push cybersecurity/frontend-app'
                }
            }
        }

        stage('Deploy Angular to Kubernetes') {
            steps {
                script {
                    // Deploy Angular to Kubernetes using the deployment and service files
                    sh 'kubectl apply -f Frontend/frontend-deployment.yaml'
                    sh 'kubectl apply -f Frontend/frontend-service.yaml'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Verify if the Angular app is successfully deployed and running in Kubernetes
                    sh 'kubectl get pods -n default'
                    sh 'kubectl get svc -n default'
                }
            }
        }
    }
}
