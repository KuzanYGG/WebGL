pipeline {
    agent { label 'Kuzan-Window'}
    
    stages {
        stage('Checkout GIT') {
            steps {
                checkout scmGit(branches: [[name: '*/${GitBranch}']], extensions: [submodule(recursiveSubmodules: true, reference: '')], userRemoteConfigs: [[credentialsId: 'KuzanYGG', url: 'https://github.com/YGG-Vietnam/YGG_Lobby.git']])
            }
        }
        
        stage('Build with Unity') {
            steps {
                echo "jaksjdkajskd"
            }
        }
        
        stage('Sync to S3'){
            steps {
                echo "Sync project to s3 and validate"
            }
        }
        
        stage('Send Notification'){
            steps {
                echo "Send Notification"
            }
        }
    }
}