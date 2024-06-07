import chalk from 'chalk';

import { baiduGenerator, bingGenerator } from '@/generators';

import { PLUGIN_NAME, SearchEngines } from '@/constants';
import { SeoHexoConfig } from '@/types';

console.log(chalk.bold.bgMagenta(`${PLUGIN_NAME} run, have fun!`));

const SearchEngineConfig = {
  enable: false,
};

const DefaultConfig: SeoHexoConfig = {
  [SearchEngines.BAIDU]: SearchEngineConfig,
  [SearchEngines.BING]: SearchEngineConfig,
  [SearchEngines.GOOGLE]: SearchEngineConfig,
};

console.log(hexo.config[PLUGIN_NAME], 'log kshao-1');

hexo.config[PLUGIN_NAME] = Object.assign(
  DefaultConfig,
  hexo.config[PLUGIN_NAME],
);

console.log(hexo.config[PLUGIN_NAME], 'log kshao-2');

// baidu engine generator
hexo.extend.generator.register(
  `${PLUGIN_NAME}[${SearchEngines.BAIDU}] generator`,
  baiduGenerator,
);

// bing engine generator
hexo.extend.generator.register(
  `${PLUGIN_NAME}[${SearchEngines.BING}] generator`,
  bingGenerator,
);
