#!groovy

def cloudWatch = null
def slack = null

pipeline {
  agent {
    label 'docker&&docker_compose&&aws_cli'
  }

  options {
    timestamps()
  }
  

  environment {
    ENVIRONMENT = 'dev'
    BUILD_START_TIMESTAMP = sh(script: "date +%s", returnStdout: true)
    AWS_ACCOUNT_ID = credentials('spe-prod-aws-account-id')
    AWS_DEFAULT_REGION = 'eu-central-1'
    AWS_ACCESS_KEY_ID = credentials('spe-prod-aws-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('spe-prod-aws-key-secret')
    ADYEN_CHECKOUT_API_KEY = credentials('spe-prod-adyen-api-key')
    SLACK_TOKEN = credentials('spe-slack-token')
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
        sh 'docker-compose run --rm spe-application -c "./scripts/run-all-tests.sh"'
      }
    }
  }
}