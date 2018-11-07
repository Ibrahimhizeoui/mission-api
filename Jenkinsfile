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
  }

  stages {
    stage("Initialize") {
      steps {
        sh "docker-compose build"
        sh "docker-compose down"
      }
    }
    
    stage("Run all tests") {
      steps {
        sh 'docker-compose run --rm app -c "./scripts/run-all-tests.sh"'
      }
    }
  }
}