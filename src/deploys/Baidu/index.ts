import nodePath from 'node:path';
import fsp from 'node:fs/promises';
import chalk from 'chalk';

import { submitUrlToEngine } from '@/services/baidu';

import { SeoHexoConfig } from '@/types';
import { SearchEngines } from '@/constants';
import { combineFilePath, getSiteDomain } from '@/Utils';

const baiduDeploys = async (
  searchEngineConfig: SeoHexoConfig[SearchEngines.BAIDU],
  // seoHexoConfig: SeoHexoConfig,
) => {
  console.log(chalk.bgGreen(`${SearchEngines.BAIDU} push running`));

  const { path, token } = searchEngineConfig;

  if (!path) {
    return Promise.reject(new Error(`${SearchEngines.BAIDU} path is required`));
  }

  const urls = await fsp.readFile(
    nodePath.join(hexo.public_dir, combineFilePath(path)),
    'utf8',
  );

  if (!token) {
    return Promise.reject(
      new Error(`${SearchEngines.BAIDU} token is required`),
    );
  }

  try {
    const response: any = await submitUrlToEngine(urls, {
      site: getSiteDomain(),
      token,
    });

    return Promise.resolve(
      `${SearchEngines.BAIDU}: success ${response?.data?.success}; ${response?.data?.remain} remain`,
    );
  } catch (error: any) {
    return Promise.reject(
      new Error(error.response?.data?.message || error.message),
    );
  }
};

export default baiduDeploys;
