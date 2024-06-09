import chalk from 'chalk';
import nodePath from 'node:path';

import BatchSubmit from '@/deploys/Google/batchSubmit';

import { SeoHexoConfig } from '@/types';
import { SearchEngines } from '@/constants';
import { combineFilePath } from '@/Utils';

const googleDeploys = async (
  searchEngineConfig: SeoHexoConfig[SearchEngines.GOOGLE],
) => {
  console.log(chalk.bgGreen(`${SearchEngines.GOOGLE} push running`));

  const { path, accountKeysJSonFile, proxy } = searchEngineConfig;

  try {
    const response = await BatchSubmit({
      file: nodePath.join(hexo.public_dir, combineFilePath(path)),
      accountKeysJSonFile,
      proxy,
    });

    if (response?.data?.includes(200)) {
      return Promise.resolve(`${SearchEngines.GOOGLE} push success`);
    }
    return Promise.reject(`${SearchEngines.GOOGLE} failed ${response?.data}`);
  } catch (error) {
    return Promise.reject(error?.response?.data.error.message || error.message);
  }
};

export default googleDeploys;
