pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = 'x'
        DOCKERHUB_PASSWORD = 'x@'
       // DOCKER_TLS_VERIFY = "1"
       // DOCKER_HOST ="npipe:////./pipe/docker_engine"
        //"tcp://127.0.0.1:55644"
        DOCKER_CERT_PATH = "C:\\Users\\OUASSIM\\.minikube\\certs"
        MINIKUBE_ACTIVE_DOCKERD = "minikube"
    }
    stages {
        stage('Prepare Environment') {
            steps {
                echo 'Setting up Git configurations...'
                bat '''
                    git config --global core.compression 0
                '''
            }
        }

        stage('Clone or Update Repository') {
            steps {
                echo 'Checking if repository exists...'
                bat '''
                    if not exist "Cybersecurity-Chatbot" (
                        echo Repository not found. Cloning...
                        git clone --depth 1 https://github.com/oumaima-echriyah/Cybersecurity-Chatbot.git
                    ) else (
                        echo Repository found. Updating...
                        cd Cybersecurity-Chatbot
                        git pull --all
                    )
                '''
            }
        }
        stage('Test Docker Access') {
            steps {
                script {
                    bat 'docker info'
        }
    }
}


        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'ouassim', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                       def loginCmd = "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                        bat(loginCmd)
                        //def loginCmd = "docker login -u ouassim012 -p Czju7848@"
                        //bat(loginCmd)
                    }
                }
            }
        }

        stage('Build Docker Image for Angular') {
            steps {
                bat '''docker build -t ouassim012/cybersecurity:frontend-app ./Cybersecurity-Chatbot/FrontEnd'''
            }
        }

        stage('Push Angular Image to Hub') {
            steps {
                bat '''docker push ouassim012/cybersecurity:frontend-app'''
            }
        }
    


        stage('Deploy Angular to Kubernetes') {
            steps {
                script {
                    echo 'Checking Minikube Status...'
                    def minikubeStatus = bat(script: 'minikube status', returnStatus: true)
                    
                    if (minikubeStatus != 0) {
                        echo 'Minikube not running. Starting Minikube...'
                        bat 'minikube start --driver=docker'
                    }
                    
                    echo 'Deploying to Kubernetes...'
                   // kubernetesDeploy(
                  //      configs: 'Cybersecurity-Chatbot/FrontEnd/frontend-deployment.yaml',
                  //      kubeconfigId: 'Kube1'
                  //  )
                   // kubernetesDeploy(
                   //     configs: 'Cybersecurity-Chatbot/FrontEnd/frontend-service.yaml',
                    //    kubeconfigId: 'Kube1'
                   // )
                   bat ''' kubectl apply -f Cybersecurity-Chatbot/FrontEnd/frontend-deployment.yaml '''
                 bat ''' kubectl apply -f Cybersecurity-Chatbot/FrontEnd/frontend-service.yaml '''

                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
