// 此处会影响图形化编辑
def submitToSearchEngine(name, args) {
    try {
        sh """
          npx hexo-seo-submit@{{PACKAGE_VERSION}} ${name} ${args}
        """
    } catch (exc) {
        echo "$name submission failed: $exc"
    }
}

pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:22-2024.08'
    }
 }

  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
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
                  submitToSearchEngine('{{ google.name }}', "-f {{ google.file }} -m $env.GOOGLE_CLIENT_EMAIL -k '$env.GOOGLE_PRIVATE_KEY'")
              }
          }
      }
    }
  }
