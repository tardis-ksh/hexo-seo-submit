import chalk from 'chalk';

import Hexo from '@/types/hexo';
import { combineFilePath, getPostUrls, getSearchEngineConfig } from '@/Utils';
import { PLUGIN_NAME, SearchEngines } from '@/constants';
import { checkSearchEngineConfig } from '@/Utils/checkValid';

const moduleName = `${PLUGIN_NAME}[${SearchEngines.GOOGLE}]engine`;

const googleGenerator = async (local: Hexo['Site']): Hexo['Return'] => {
  console.log(chalk.bgYellowBright(`${moduleName}: generator running`));

  const searchConfig = getSearchEngineConfig<SearchEngines.GOOGLE>(
    SearchEngines.GOOGLE,
  );

  try {
    await checkSearchEngineConfig(searchConfig);
  } catch (error) {
    console.log(chalk.bgRed.bold(`${moduleName}: ${error.message}`));
    return undefined;
  }

  const { path = 'google.txt', ...restSearchEngineConfig } = searchConfig;

  const result = {
    data: getPostUrls(local.posts, restSearchEngineConfig),
    path: combineFilePath(path),
  };

  if (!result.data?.length) {
    chalk.bgRed(
      `${PLUGIN_NAME}: generator error, no post found, please check your config`,
    );
    return;
  }

  console.log(chalk.bgYellowBright(`${moduleName}: generator done`));

  return result;
};

export default googleGenerator;
