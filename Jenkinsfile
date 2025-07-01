pipeline {
    agent { label 'Kuzan-Window'}
    parameters {
        string(name: 'branch', defaultValue: 'developlemnt')
    }
    stages {
        stage('Checkout GIT') {
            steps {
				echo ${params.branch}
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*${params.branch}"]],
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