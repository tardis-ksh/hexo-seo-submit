name: Hexo Seo Submit
on:
  schedule:
    - cron: {{ schedule.cron }}
  push:
    branches:
      - {{ branch }}

concurrency:
  group: {{{raw "${{ github.workflow }}-${{ github.ref }}"}}}
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: actions/setup-node@main
        with:
          node-version: latest

      - name: check owner
        id: check_owner
        run: |
          OWNER_TYPE=$(jq -r '.repository.owner.type' "$GITHUB_EVENT_PATH")
          OWNER_ID=$(jq -r '.repository.owner.id' "$GITHUB_EVENT_PATH")
          SENDER_ID=$(jq -r '.sender.id' "$GITHUB_EVENT_PATH")

          if [ "$OWNER_TYPE" = "User" ] && [ "$OWNER_ID" -eq "$SENDER_ID" ]; then
            echo "is_owner=true" >> $GITHUB_ENV
          elif [ "$OWNER_TYPE" = "Organization" ]; then
            echo "is_owner=true" >> $GITHUB_ENV
          else
            echo "is_owner=false" >> $GITHUB_ENV
          fi
        env:
          GITHUB_EVENT_PATH: {{{raw ${{ github.event_path }}"}}}

      - run: |
          npm init -y
          npm install hexo-seo-submit

      {{#if baidu.enable}}
      - name: push search engine {{ baidu.name }}
        if: env.is_owner
        run: |
          npx hexo-seo-submit {{ baidu.name }} -t {{{raw "${{ secrets.baidu_token }}"}}} -s {{ site }} -f {{ baidu.file }}
      {{/if}}

      {{#if bing.enable}}
      - name: push search engine {{ bing.name }}
        if: env.is_owner
        run: |
          npx hexo-seo-submit {{ bing.name }} -k {{{raw "${{ secrets.bing_apikey }}"}}} -f {{ bing.file }}
      {{/if}}

      {{#if google.enable}}
      - name: push search engine {{ google.name }}
        if: env.is_owner
        run: |
          npx hexo-seo-submit {{ google.name }} -f {{ google.file }} -mail {{{raw "${{ secrets.google_client_email }}"}}} -key "{{{raw "${{ secrets.google_private_key }}"}}}"
      {{/if}}
