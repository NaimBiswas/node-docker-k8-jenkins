pipeline {
    agent any

    environment {
        REGISTRY = 'gcr.io/laststop-gcloud-storage/node-mongo-app'
        KUBECONFIG = credentials('kubeconfig')
        KUBE_NAMESPACE = "default"
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/NaimBiswas/node-docker-k8-jenkins.git'
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
                    docker.withRegistry('https://gcr.io', "google-container-registry") {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'gcloud container clusters get-credentials gke-cluster --zone asia-south1-a --project laststop-gcloud-storage'
                sh '''
                    kubectl set image deployment/node-mongo-app node-mongo-app=$REGISTRY:$BUILD_NUMBER
                    kubectl rollout status deployment/node-mongo-app
                    '''

            }
        }
    }
}