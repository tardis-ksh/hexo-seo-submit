import chalk from 'chalk';

import baiduDeploys from '@/deploys/Baidu';
import bingDeploys from '@/deploys/Bing';
import googleDeploys from '@/deploys/Google';

import Hexo from '@/types/hexo';
import { PLUGIN_NAME, SearchEngines } from '@/constants';
import { DiffEngineConfig, SearchEngineConfig } from '@/types';

const moduleName = `${PLUGIN_NAME}-deploys:`;

const deploys = async (local: Hexo) => {
  console.log(chalk.bgGreenBright(`${moduleName} running`));

  const pluginConfig = local.config[PLUGIN_NAME];

  if (!pluginConfig) {
    console.log(chalk.bgRed(`${moduleName} please check your config`));
  }

  const searchEngineConfigs = Object.values(SearchEngines)
    .map((key) => {
      return {
        ...pluginConfig[key],
        engineType: key,
      } as SearchEngineConfig &
        DiffEngineConfig[SearchEngines] & { engineType: SearchEngines };
    })
    .filter((config) => config.enable === true);

  if (!searchEngineConfigs.length) {
    console.log(chalk.bgRed(`${moduleName} no search engine config enabled`));
  }

  const searchRequestMap = {
    [SearchEngines.BAIDU]: baiduDeploys,
    [SearchEngines.BING]: bingDeploys,
    [SearchEngines.GOOGLE]: googleDeploys,
  };

  const requestQueue = searchEngineConfigs.map(async (config) => {
    return searchRequestMap[config.engineType]?.(config);
  });

  try {
    const results = await Promise.allSettled(requestQueue);
    results.forEach((result) => {
      const { status } = result;

      if (status === 'fulfilled') {
        console.log(chalk.bgGreen(result.value));
      } else {
        throw new Error(result.reason);
      }
    });
  } catch (error) {
    console.log(chalk.bgRed(`${moduleName} ${error.message}`));
  }
};

export default deploys;
