pipeline {
    agent any

    environment {
        GCR_CREDENTIALS = credentials('gcr-credentials') // Your GCR credentials ID in Jenkins
        REGISTRY = 'gcr.io/laststop-gcloud-storage/node-mongo-app'  // Replace with your GCP project ID and image name
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/NaimBiswas/node-docker-k8-jenkins' // Your GitHub repository URL
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("$REGISTRY:$BUILD_NUMBER")
                }
            }
        }
        stage('Push Docker Image to GCR') {
            steps {
                script {
                    docker.withRegistry('https://gcr.io', GCR_CREDENTIALS) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig-credentials']) {
                    sh '''
                    kubectl set image deployment/node-mongo-app node-mongo-app=$REGISTRY:$BUILD_NUMBER
                    kubectl rollout status deployment/node-mongo-app
                    '''
                }
            }
        }
    }
}
