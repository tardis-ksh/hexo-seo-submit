name: Hexo SEO Auto Push
on:
  schedule:
    - cron: {{ schedule.cron }}
  watch:
    types: [started]
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id || github.event_name == 'schedule'
    steps:
      - uses: actions/checkout@main
      - uses: actions/setup-node@main
        with:
          node-version: latest
      - run: |
          npm init -y
          npm install hexo-seo-submit

      {{#if baidu.enable}}
      - name: push search engine {{ baidu.name }}
        run: |
          npx hexo-seo-submit {{ baidu.name }} -t {{{raw "${{ secrets.baidu_token }}"}}} -s {{ site }} -f {{ baidu.file }}
      {{/if}}

      {{#if bing.enable}}
      - name: push search engine {{ bing.name }}
        run: |
          npx hexo-seo-submit {{ bing.name }} -k {{{raw "${{ secrets.bing_apikey }}"}}} -f {{ bing.file }}
      {{/if}}

      {{#if google.enable}}
      - name: push search engine {{ google.name }}
        run: |
          npx hexo-seo-submit {{ google.name }} -f {{ google.file }} -mail {{{raw "${{ secrets.client_email }}"}}} -key "{{{raw "${{ secrets.private_key }}"}}}"
      {{/if}}
