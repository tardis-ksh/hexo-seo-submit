import nodePath from 'node:path';
import fsp from 'node:fs/promises';
import chalk from 'chalk';

import { submitUrlToEngine } from '@/services/bing';

import { SeoHexoConfig } from '@/types';
import { SearchEngines } from '@/constants';
import { combineFilePath } from '@/Utils';

const bingDeploys = async (
  searchEngineConfig: SeoHexoConfig[SearchEngines.BING],
  // seoHexoConfig: SeoHexoConfig,
) => {
  console.log(chalk.bgGreen(`${SearchEngines.BING} push running`));

  const { path, apiKey } = searchEngineConfig;

  const originContent = await fsp.readFile(
    nodePath.join(hexo.public_dir, combineFilePath(path)),
    'utf8',
  );

  const parseContent = JSON.parse(originContent || '') as {
    urlList: string[];
    siteUrl: string;
  };

  if (!parseContent || typeof parseContent !== 'object') {
    return Promise.reject(
      new Error(`${SearchEngines.BING}: parse content failed`),
    );
  }

  try {
    await submitUrlToEngine(parseContent?.urlList, {
      siteUrl: parseContent?.siteUrl,
      apiKey,
    });

    return Promise.resolve(`${SearchEngines.BING}: push success`);
  } catch (error) {
    return Promise.reject(new Error(error?.response?.data?.message || error.message));
  }
};

export default bingDeploys;
