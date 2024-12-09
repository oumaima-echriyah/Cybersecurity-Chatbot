pipeline {
    agent any

    stages {
        stage('Prepare Environment') {
            steps {
                echo 'Setting up Git configurations...'
                bat '''
                    git config --global core.compression 0
                '''
            }
        }

        stage('Clone Repository') {
            steps {
                echo 'Cloning repository with shallow copy...'
                bat '''
                    git clone --depth 1 https://github.com/oumaima-echriyah/Cybersecurity-Chatbot.git
                '''
            }
        }

        stage('Fetch Full History') {
            steps {
                echo 'Fetching full Git history...'
                bat '''
                    cd Cybersecurity-Chatbot
                    git fetch --unshallow
                    git pull --all
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}