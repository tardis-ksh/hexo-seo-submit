import chalk from 'chalk';

import Hexo from '@/types/hexo';
import { combineFilePath, getPostUrls, getSearchEngineConfig } from '@/Utils';
import { PLUGIN_NAME, SearchEngines } from '@/constants';

const moduleName = `${PLUGIN_NAME}[${SearchEngines.BAIDU}]engine`;

const baiduGenerators = (local: Hexo['Site']): Hexo['Return'] => {
  console.log(chalk.bgGreen(`${moduleName}: generator running`));

  const {
    enable,
    path = 'baidu.txt',
    ...seoConfig
  } = getSearchEngineConfig<SearchEngines.BAIDU>(SearchEngines.BAIDU);

  if (!enable) {
    console.log(
      chalk.bgGreen(`${moduleName}: exit~ this engine is not enabled`),
    );
    return;
  }

  const result = {
    data: getPostUrls(local.posts, seoConfig),
    path: combineFilePath(path),
  };

  if (!result.data?.length) {
    chalk.bgRed(
      `${PLUGIN_NAME}: generator error, no post found, please check your config`,
    );
    return;
  }

  console.log(chalk.bgGreen(`${moduleName}: generator done`));

  return result;
};

export default baiduGenerators;
