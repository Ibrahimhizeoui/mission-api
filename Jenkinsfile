#!groovy

def cloudWatch = null
def slack = null

pipeline {
  agent any

  options {
    timestamps()
  }
  

  environment {
    ENVIRONMENT = 'dev'
    BUILD_START_TIMESTAMP = sh(script: "date +%s", returnStdout: true)
    AWS_DEFAULT_REGION = 'eu-central-1'
    AWS_ACCESS_KEY_ID = credentials('mission-test-aws-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('mission-test-aws-key-secret')
  }

  stages {
    stage("Initialize") {
      steps {
        sh "docker-compose pull"
        sh "docker-compose down"
      }
    }
    
    stage("Run all tests") {
      steps {
        sh 'docker-compose run --rm mession-app -c "./scripts/run-all-tests.sh"'
      }
    }
  }
}