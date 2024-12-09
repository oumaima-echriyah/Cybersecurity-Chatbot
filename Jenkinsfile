pipeline {
    agent any
    
   environment {
        DOCKERHUB_USERNAME = 'x'
        DOCKERHUB_PASSWORD = 'x@'
    }

    stages {
       
        stage('Checkout') {
            steps {
                script {
                    sh 'git config --global http.postBuffer 157286400'

                    // Ensure the correct branch is checked out
                    try {
                        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/oumaima-echriyah/Cybersecurity-Chatbot']])
                    } catch (Exception e) {
                        error "Git checkout failed: ${e.message}"
                    }
                }
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub with error handling
                    try {
                        sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                    } catch (Exception e) {
                        error "Docker login failed: ${e.message}"
                    }
                }
            }
        }
        
        stage('Build Docker image for Angular') {
            steps {
                script {
                    // Build Docker image for Angular with error handling
                    try {
                        sh 'docker build -t cybersecurity/frontend-app Frontend'
                    } catch (Exception e) {
                        error "Docker build failed: ${e.message}"
                    }
                }
            }
        }

        stage('Push Angular image to Docker Hub') {
            steps {
                script {
                    // Push Docker image to Docker Hub with error handling
                    try {
                        sh 'docker push cybersecurity/frontend-app'
                    } catch (Exception e) {
                        error "Docker push failed: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy Angular to Kubernetes') {
            steps {
                script {
                    // Deploy Angular to Kubernetes with error handling
                    try {
                        sh 'kubectl apply -f Frontend/frontend-deployment.yaml'
                        sh 'kubectl apply -f Frontend/frontend-service.yaml'
                    } catch (Exception e) {
                        error "Kubernetes deployment failed: ${e.message}"
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Verify if the Angular app is successfully deployed and running in Kubernetes
                    try {
                        sh 'kubectl get pods -n default'
                        sh 'kubectl get svc -n default'
                    } catch (Exception e) {
                        error "Kubernetes verification failed: ${e.message}"
                    }
                }
            }
        }
    }
}
