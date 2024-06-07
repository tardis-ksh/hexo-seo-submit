import chalk from 'chalk';

import Hexo from '@/types/hexo';
import { combineFilePath, getPostUrls, getSearchEngineConfig } from '@/Utils';
import { PLUGIN_NAME, SearchEngines } from '@/constants';
import { checkSearchEngineConfig } from '@/Utils/checkValid';

const moduleName = `${PLUGIN_NAME}[${SearchEngines.BAIDU}]engine`;

const baiduGenerators = async (local: Hexo['Site']): Hexo['Return'] => {
  console.log(chalk.bgGreen(`${moduleName}: generator running`));

  const searchConfig = getSearchEngineConfig<SearchEngines.BAIDU>(
    SearchEngines.BAIDU,
  );

  try {
    await checkSearchEngineConfig(searchConfig);
  } catch (error) {
    console.log(chalk.bgRed.bold(`${moduleName}: ${error.message}`));
    return undefined;
  }

  const { path = 'baidu.txt', ...seoConfig } = searchConfig;

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
