# baidu
$ npx hexo-seo-submit baidu -t <your baidu token> -s https://ksh7.com -f baidu.txt

# bing
# must .json file, Eg: { siteUrl: 'https://ksh7.com', urlList: ['xxx'] }
$ npx hexo-seo-submit bing -k <you bing api key> -f examples/files/bing.json

# google
# use Environment variables
$ export PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
$ npx hexo-seo-submit google -f examples/files/baidu.txt -p http://127.0.0.1:7890 -m <your client_email here> -k "$PRIVATE_KEY"

# use json file
$ npx hexo-seo-submit google -f examples/files/baidu.txt -p http://127.0.0.1:7890 -a examples/files/google-keys.json
