#!/usr/bin/env node
import { program } from 'commander';
import fs from 'node:fs';
import nodePath from 'node:path';
import chalk from 'chalk';

import { PLUGIN_NAME, SearchEngines } from '@/constants';
import { getFileContent } from '@/Utils';
import { submitUrlToEngine as baiduSubmitUrlToEngine } from '@/services/baidu';
import { submitUrlToEngine as bingSubmitUrlToEngine } from '@/services/bing';
import googleBatchSubmit from '@/deploys/Google/batchSubmit';
import type { BatchSubmitConfig } from '@/deploys/Google/type';

const packageJsonContent = fs.readFileSync(
  nodePath.join(process.cwd(), 'package.json'),
  'utf8',
);

const packageJson = JSON.parse(packageJsonContent || '');

program
  .name(PLUGIN_NAME)
  .description('push url to search engine')
  .version(packageJson.version);

program
  .command(SearchEngines.BAIDU)
  .argument('[]')
  .requiredOption('-t, --token <token>', 'push token.')
  .requiredOption('-f, --file <file>', 'urls file path.')
  .requiredOption('-s, --site <site>', 'blog site. Eg: https://ksh7.com')
  .action(async (_, options) => {
    try {
      const { token, file, site } = options;
      const urlsContent = await getFileContent(file);
      const response = await baiduSubmitUrlToEngine(urlsContent, {
        token,
        site,
      });
      console.log(
        chalk.bgGreen(
          `success ${response?.data?.success}; ${response?.data?.remain} remain`,
        ),
      );
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      process.exit(1);
    }
  });

program
  .command(SearchEngines.BING)
  .argument('[]')
  .requiredOption('-k, --key <key>', 'push api key.')
  .requiredOption('-f, --file <file>', 'url json file path.')
  .action(async (_, options) => {
    const { key, file } = options;
    try {
      const urlJsonContent = await getFileContent(file);
      const urlJson = JSON.parse(urlJsonContent || '');
      await bingSubmitUrlToEngine(urlJson?.urlList, {
        siteUrl: urlJson?.siteUrl,
        apiKey: key,
      });
      console.log(chalk.bgGreen('push success'));
    } catch (error) {
      console.error(error?.response?.data || error.message);
      process.exit(1);
    }
  });

program
  .command(SearchEngines.GOOGLE)
  .argument('[]')
  .requiredOption('-f, --file <file>', 'url file path.')
  .option(
    '-p, --proxy <proxy>',
    'https proxy url. Eg: http[s]://127.0.0.1:7890',
  )
  .option(
    '-mail, --client_email <client_email>',
    'accountKeysJSon.client_email',
  )
  .option('-key, --private_key <private_key>', 'accountKeysJSon.private_key')
  .option(
    '-kf, --accountKeysJSonFile <accountKeysJSonFile>',
    'accountKeysJSonFile path',
  )
  .action(async (_, options) => {
    const { accountKeysJSonFile, client_email, private_key, proxy, file } =
      options;

    if (!accountKeysJSonFile && !(client_email && private_key)) {
      console.error('error: miss credentials');
      process.exit(1);
      return;
    }

    try {
      const submitConfig: Partial<BatchSubmitConfig> = {};
      // use props
      if (client_email && private_key) {
        submitConfig.accountKeysJSon = JSON.stringify({
          client_email,
          private_key,
        });
      } else {
        submitConfig.accountKeysJSonFile = accountKeysJSonFile;
      }

      const response = await googleBatchSubmit({
        file: nodePath.join(process.cwd(), file),
        ...submitConfig,
        proxy,
      });

      if (response?.data?.includes(200)) {
        console.log(chalk.bgGreen('push success'));
      } else {
        console.error(`failed ${response?.data}`);
        process.exit(1);
      }
    } catch (error) {
      console.log(
        `google error: ${error?.response?.data.error.message || error.message}`,
      );
      process.exit(1);
    }
  });

program.parse();
