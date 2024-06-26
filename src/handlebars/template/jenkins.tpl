def submitToSearchEngine(name, args) {
    try {
        sh "npx hexo-seo-submit $name $args"
    } catch (exc) {
        echo "$name submission failed: $exc"
    }
}

pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:21-2024.01'
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
                  submitToSearchEngine('{{ baidu.name }}', "-t $env.BAIDU_TOKEN -s {{ site }} -f {{ baidu.file }}")
                  submitToSearchEngine('{{ bing.name }}', "-k $env.BING_APIKEY -f {{ bing.file }}")
                  submitToSearchEngine('{{ google.name }}', "-f {{ google.file }} -mail $env.GOOGLE_CLIENT_EMAIL -key $env.GOOGLE_PRIVATE_KEY")
              }
          }
      }
    }
  }
