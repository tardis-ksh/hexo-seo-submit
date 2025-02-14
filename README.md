<div align="center">
<a name="readme-top"></a>

<h1> Hexo Seo Submit </h1>

<a href="https://github.com/tardis-ksh/hexo-seo-submit/">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=Hexo Seo Submit;&center=true&size=27" alt="Typing SVG" />
</a>

自动或手动提交您的网站信息至搜索引擎（谷歌，bing，百度）。支持配置 `GitHub Actions` 或 `Coding Jenkins` 来适配不同平台的 `CI`

[![CI status][github-action-image]][github-action-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

</div>

[github-action-image]: https://github.com/tardis-ksh/hexo-seo-submit/actions/workflows/publish.yml/badge.svg
[github-action-url]: https://github.com/tardis-ksh/hexo-seo-submit/actions/workflows/publish.yml
[npm-image]: https://img.shields.io/npm/v/hexo-seo-submit.svg?style=flat-square
[npm-url]: https://npmjs.org/package/hexo-seo-submit
[download-image]: https://img.shields.io/npm/dm/hexo-seo-submit.svg?style=flat-square
[download-url]: https://npmjs.org/package/hexo-seo-submit

> star 后使用，效果更佳~~

## 📦 Install

```bash
npm install hexo-seo-submit
```

```bash
yarn add hexo-seo-submit
```

```bash
pnpm add hexo-seo-submit
```

## 🔨 Usage

> 直达文档：[hexo-seo-submit docs](https://ksh7.com/posts/docs-hexo-seo-submit/)

在 `hexo/_config.yml` 中配置 `hexo-seo-submit`

```yaml root/_config.yml
hexo-seo-submit:
  sortBy: updated # created | updated, default created
  count: 2 # set all engine count, default 10
  fileRootPath: hexo-seo-submit # will generate in root/public/fileRootPath, default '', root/public/
  CI:
    enable: true
    cron: 0 4 * * *
    platform: github # github | coding, default gitHub
    branch: main # actions trigger branch, default master

  baidu:
    enable: true # default false
    path: baidu.txt # default google.txt
    count: 1
    token: you baidu token
  google:
    enable: true
    path: google-url.txt # default google.txt
    # find path in root
    accountKeysJSonFile: google.json # path.join(process.cwd(), path)
    count: 2
    # maybe required
    proxy: http://127.0.0.1:7890
  bing:
    enable: true
    apiKey: your bing api key
    sortBy: created # default created
    path: bing.json
```

### github 中使用

如果在 `github actions` 中运行，可如下简化

```yaml
hexo-seo-submit:
  CI:
    enable: true
  baidu:
    enable: true
  google:
    enable: true
  bing:
    enable: true
```

注意！生成后的 `actions` 文件路径为：`public/.github/workflows/hexo-seo-submit.yml`，由于点开头的文件或文件夹默认被 `hexo-deployer-git`忽略，你需要在 `_config.yml` 的 `deploy` 中

```yaml
deploy:
  type: git
  repo: https://github.com/<username>/<project>
  ignore_hidden: false # 忽略隐藏文件及文件夹(目录)
```

**复制[申请凭证](#申请凭证)中获取的值，注意`粘贴`时需去除`引号`。`name` 可以直接复制表格**

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmt0w7nrj31ww0tqdpd.jpg)

| Name | Value | 说明               |
| --- | --- |------------------|
| baidu_token |  | 百度的 token        |
| bing_apikey |  | 必应的 apikey       |
| google_private_key | -----BEGIN PRIVATE KEY-----\n.....\n-----END PRIVATE KEY-----\n | 谷歌的 private_key  |
| google_client_email |  | 谷歌的 client_email |

**谷歌的 `private_key` 在带引号或不带引号复制粘贴时，在 `actions` 变量输入框中将表现不一（如下的图一和图二）。带引号复制粘贴会在使用时转义 `换行符`（`\n` => `\\n` or `\\\\n`），目前理论解决该问题，若遇到 `routines::unsupported` 可尝试直接复制粘贴引号内的内容~**

> 图一：复制粘贴引号内的内容
> 图二：复制粘贴包含引号内容，再去除引号

![复制引号内的内容](https://image.baidu.com/search/down?url=https://static.ksh7.com/post/docs-hexo-seo-submit/google-key-1.webp)
![复制的内容包含引号](https://image.baidu.com/search/down?url=https://static.ksh7.com/post/docs-hexo-seo-submit/google-key-2.webp)

### coding 中使用

```yaml
hexo-seo-submit:
  CI:
    enable: true
    platform: coding
  baidu:
    enable: true
  google:
    enable: true
  bing:
    enable: true
```

1. `在项目 => 持续集成 => 构建计划` 中创建构建计划

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmxy07h9j30b40ug76k.jpg) ![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmt10atqj31ts11e4ed.jpg) 2. 创建完后点 `去设置` 在基础信息中，将 `配置来源` 选择为 `使用代码库中的 Jenkinsfile`。`节点配置池` 需要选择可以连接 google 的节点，若无此需求可随意

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmn9pjbhsj31yu12cnam.jpg) 3. 在 `触发规则` 中可配置触发条件，例如：`main` 分支提交时触发和定时触发等。注意点保存

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmn9pfhxvj32i00tmtl6.jpg) ![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmn9p74jxj316e0yctfb.jpg) 4. 在 `变量与缓存` 中添加环境变量

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmn9q8iowj31p80mkk08.jpg)

**变量都不需要`引号`，复制粘贴 `google_private_key` 时需保持格式正确，建议连带`引号`复制，再去除即可**

| Name | Value | 说明 |
| --- | --- | --- |
| baidu_token |  | 百度的 token |
| bing_apikey |  | 必应的 apikey |
| google_private_key | -----BEGIN PRIVATE KEY-----\n.....\n-----END PRIVATE KEY-----\n | 谷歌的 private_key |
| google_client_email |  | 谷歌的 client_email |

### 本地 `deploy` 时 `push` 到搜索引擎

```yaml
hexo-seo-submit:
  baidu:
    enable: true
    token: you baidu token
  google:
    enable: true
    accountKeysJSonFile: google.json
    proxy: http://127.0.0.1:7890
  bing:
    enable: true
    apiKey: your bing api key

# 注意在此处配置
deploy:
  - type: hexo-seo-submit
```

本地执行 `hexo deploy` 时，`hexo-seo-submit` 会将 `public` 中生成的 `urls` 提交至搜索引擎、你需要将申请的 Baidu token、Bing apikey、Google json 填入。如果你的网络环境连接 `google` 较慢的话，可以尝试使用 `proxy` 字段，支持 `https`。最后需要在 `deploy` 中配置

## 参数

# hexo-seo-submit 配置参数描述

| 参数                        | 类型    | 描述                                                                       | 默认值                   |
|-----------------------------|---------|--------------------------------------------------------------------------|-----------------------|
| `hexo-seo-submit`           |         | 根配置项                                                                     |                       |
| `sortBy`                    | string  | 排序依据，`created` 或 `updated` ，优先使用引擎中的字段                                   | `created`             |
| `count`                     | integer | 生成 url 的数量，优先使用引擎中的字段                                                    | 10                    |
| `fileRootPath`              | string  | 生成文件的根路径，将生成在 `root/public/fileRootPath` 目录，如果你不想分散在 public 目录中，则可以使用该字段 | `''`，即 `root/public/` |
| `CI`                        | object  | 持续集成配置                                                                   |                       |
| `CI.enable`                 | boolean | 是否启用持续集成                                                                 | false                 |
| `CI.cron`                   | string  | CRON 表达式，指定任务调度时间，注意在 `actions` 中的时区，且仅在 `platform` 为 `github` 时有效       | `0 4 * * *`           |
| `CI.platform`               | string  | `github` 或 `coding`                                                      | `github`              |
| `CI.branch`                 | string  | 触发操作的分支名称，仅在 `github` 时有效                                                | `master`              |
| `baidu`                     | object  | 百度搜索引擎配置                                                                 |                       |
| `baidu.enable`              | boolean | 是否启用百度搜索引擎                                                               | false                 |
| `baidu.path`                | string  | 生成 urls 文件的路径                                                            | `baidu.txt`           |
| `baidu.count`               | integer | 生成 urls 的数量                                                              |                       |
| `baidu.sortBy`               | string  | 排序依据                                                                     |                       || `baidu.token`               | string  | 百度搜索引擎的 token                                                            |                         |
| `google`                    | object  | 谷歌搜索引擎配置                                                                 |                       |
| `google.enable`             | boolean | 是否启用谷歌搜索引擎                                                               | true                  |
| `google.path`               | string  |                                                                          | `google.txt`          |
| `google.accountKeysJSonFile`| string  | 谷歌账户密钥文件路径，默认 root 目录寻找                                                  | `google.json`         |
| `google.count`              | integer |                                                                          |                       |
| `google.sortBy`              | integer |                                                                          |                       |
| `google.proxy`              | string  | https proxy，如果你是 clash 一般默认为 `http://127.0.0.1:7890`                     |                       |
| `bing`                      | object  | 必应搜索引擎配置                                                                 |                       |
| `bing.enable`               | boolean | 是否启用必应搜索引擎                                                               | true                  |
| `bing.apiKey`               | string  | 必应搜索引擎的 API 密钥                                                           |                       |
| `bing.sortBy`               | string  |                                                                          |                       |
| `bing.path`                 | string  |                                                                          | bing.json             |

## 使用命令执行

```shell
npx hexo-seo-submit -h
# or
npx hexo-seo-submit google -h
```

```shell
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
```

## 注意事项

1. 搜索引擎中的 `path` 更改时注意后缀应于默认值保持一致
2. `google` 连接缓慢？请使用 `proxy` 字段
3. `google push` 失败？请注意 `google_private_key` 的格式

# 申请凭证

## Baidu

[百度站长平台](https://ziyuan.baidu.com) => `普通收录` => `资源提交` 中得到 `token`，

```
http://data.zz.baidu.com/urls?site=https://ksh7.com&token=***********
```

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmnxra2wkj326617m1a1.jpg)

效果查看，一般 T+1，或查看 actions 中的运行日志。

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmnxqrl97j31um11cjzj.jpg)

## Google

1. 进入 [Web Search Indexing API](https://console.cloud.google.com/apis/library/indexing.googleapis.com)，选择 `项目` 并启用 API，没有可新建。

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsy6c7lj31mc1307c9.jpg)

2. 点击 `管理` 按钮，`进入` 凭据 菜单，选择 `创建凭据 => 服务账号`

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsy72ntj31lk0w8gtx.jpg)

3. 填写 `服务账号ID` ，`服务名称` 可选，随后直接点击 `完成`

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsyb21qj31gm10edod.jpg)

4. 点击创建好的[服务账号](https://console.cloud.google.com/apis/credentials)，点击 `密钥` => `添加密钥`，选择 `创建新密钥`，选择 `JSON` 格式，点击 `创建`，下载 `json` 文件

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsy1ok3j31f40ygthb.jpg)

内容如下，在 `github secrets` 中分别对应 `google_private_key`、`google_client_email` 注意，在 `github` 中，复制 `private_key` 时不需要 `引号`，在 `coding` 中复制需要 `引号`

```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxxxxx\n-----END PRIVATE KEY-----\n",
  "client_email": "googleindexing@elated-guild-298003.iam.gserviceaccount.com"
}
```

5. 打开 [Google Search Console](https://search.google.com/search-console/users)，`设置 => 用户和权限 => 添加用户`，邮箱为上述 `json email`，权限请选择 `拥有者`

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmoxephm3j32fc102agg.jpg)

6. 打开 [https://console.cloud.google.com/apis/api/indexing.googleapis.com/metrics](https://console.cloud.google.com/apis/api/indexing.googleapis.com/metrics)，选择你的项目，进行验证

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsx6gfgj32iq0ou0xy.jpg)

## Bing

1. 打开 [https://www.bing.com/webmasters/home](https://www.bing.com/webmasters/home)，选择谷歌账号登录（可同步 `Google Search Console`，无需再验证）

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsyufc1j32t814in6a.jpg)

2. 点击右上角的 `设置 => API 访问 => 复制 API 密钥` 即可

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmswgb54j30p20vwdi1.jpg)

3. `URL 提交`菜单中可验证

![](https://image.baidu.com/search/down?url=https://gzw.sinaimg.cn/mw2000/0085UwQ9gy1hqmmsy5d3dj31rw0zudnw.jpg)

# 参考

> [hexo-seo-submit docs](https://ksh7.com/posts/docs-hexo-seo-submit/)

> [Hexo-SEO-AutoPush](https://github.com/Lete114/Hexo-SEO-AutoPush/tree/master)

> [hexo-url-submission](https://github.com/abnerwei/hexo-url-submission.git)
