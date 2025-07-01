pipeline {
    agent { label 'Kuzan-Window'}
    
    stages {
        stage('Checkout GIT') {
            steps {
				echo ${branch}
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*${branch}"]],
                ])
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