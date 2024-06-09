import fsp from 'node:fs/promises';
import nodePath from 'node:path';

import { batchSubmitUrl } from '@/services/google';

import { checkGoogleConfig } from '@/Utils/checkValid';
import { BatchSubmitConfig } from '@/deploys/Google/type';
import { GoogleAccountKeysJson } from '@/types';
import { CONTENT_SEPARATOR } from '@/constants';

const batchSubmit = async (config: BatchSubmitConfig) => {
  // check config
  try {
    await checkGoogleConfig(config);
  } catch (error) {
    return Promise.reject(error.message);
  }

  const { file, accountKeysJSon, accountKeysJSonFile, proxy } = config;
  let secretsJson = accountKeysJSon;
  if (accountKeysJSonFile) {
    secretsJson = await fsp.readFile(
      nodePath.join(process.cwd(), accountKeysJSonFile),
      'utf8',
    );
  }
  const secretsConfig = JSON.parse(secretsJson || '') as GoogleAccountKeysJson;

  const urlContent = await fsp.readFile(file, 'utf8');

  if (!urlContent) {
    return Promise.reject(new Error('no url to submit'));
  }

  const urlList = urlContent.split(CONTENT_SEPARATOR);

  return batchSubmitUrl({
    urlList,
    secretsConfig,
    proxy,
  });
};

export default batchSubmit;
