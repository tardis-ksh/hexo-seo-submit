import chalk from 'chalk';

import Hexo from '@/types/hexo';
import { combineFilePath, getPostUrls, getSearchEngineConfig } from '@/Utils';
import { CONTENT_SEPARATOR, PLUGIN_NAME, SearchEngines } from '@/constants';
import { checkSearchEngineConfig } from '@/Utils/checkValid';

const moduleName = `${PLUGIN_NAME}[${SearchEngines.BING}]engine`;

const bingGenerator = async (local: Hexo['Site']): Hexo['Return'] => {
  console.log(chalk.bgBlue.white(`${moduleName}: generator running`));

  const searchConfig = getSearchEngineConfig<SearchEngines.BING>(
    SearchEngines.BING,
  );

  try {
    await checkSearchEngineConfig(searchConfig);
  } catch (error) {
    console.log(chalk.bgRed.bold(`${moduleName}: ${error.message}`));
    return undefined;
  }

  const { path, ...restSearchEngineConfig } = searchConfig;

  const result = {
    data: getPostUrls(local.posts, restSearchEngineConfig),
  };

  if (!result.data?.length) {
    chalk.bgRed(
      `${PLUGIN_NAME}: generator error, no post found, please check your config`,
    );
    return;
  }

  const bingConfig = {
    data: JSON.stringify({
      siteUrl: hexo.config.url,
      urlList: result.data.split(CONTENT_SEPARATOR),
    }),
    path: combineFilePath(path),
  };

  console.log(chalk.bgBlue.white(`${moduleName}: generator done`));

  return bingConfig;
};

export default bingGenerator;
