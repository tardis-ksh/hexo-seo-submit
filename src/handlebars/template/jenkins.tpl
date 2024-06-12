pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:20-2024.01'
      args '-v /root/.npm:/root/.npm'
    }
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
          ]]])
        }
      }

      stage('Setup') {
        steps {
          script {
            sh 'npm init -y'
            sh 'npm install hexo-seo-submit'
          }
        }
      }

      stage('Push Search Engines') {
        steps {
          script {
            sh "npx hexo-seo-submit {{ baidu.name }} -t $env.BAIDU_TOKEN -s {{ site }} -f {{ baidu.file }}"
            sh "npx hexo-seo-submit {{ bing.name }} -k $env.BING_APIKEY -f {{ bing.file }}"
            sh "npx hexo-seo-submit {{ google.name }} -f {{ google.file }} -mail $env.GOOGLE_CLIENT_EMAIL -key $env.GOOGLE_PRIVATE_KEY"
          }
        }
      }
    }
  }
