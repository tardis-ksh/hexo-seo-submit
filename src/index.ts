import chalk from 'chalk';
import merge from 'lodash.merge';

import {
  baiduGenerator,
  bingGenerator,
  googleGenerator,
  CIGenerators,
} from '@/generators';
import deploys from '@/deploys';

import { CIPlatform, PLUGIN_NAME, SearchEngines } from '@/constants';
import { SeoHexoConfig } from '@/types';
import IHexo from '@/types/hexo';

console.log(chalk.bold.bgMagenta(`${PLUGIN_NAME} run, have fun!`));

const SearchEngineConfig = {
  enable: false,
};

const DefaultConfig: SeoHexoConfig = {
  fileRootPath: '',
  count: 10,
  CI: {
    enable: true,
    platform: CIPlatform.GITHUB,
    cron: '0 4 * * *',
    branch: 'master',
  },
  [SearchEngines.BAIDU]: {
    ...SearchEngineConfig,
    path: 'baidu.txt',
  },
  [SearchEngines.BING]: {
    ...SearchEngineConfig,
    path: 'bing.json',
  },
  [SearchEngines.GOOGLE]: {
    ...SearchEngineConfig,
    path: 'google.txt',
  },
};

// console.log(hexo.config[PLUGIN_NAME], 'log kshao-1');

hexo.config[PLUGIN_NAME] = merge({}, DefaultConfig, hexo.config[PLUGIN_NAME]);

// console.log(hexo.config[PLUGIN_NAME], 'log kshao-2');

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

// google engine generator
hexo.extend.generator.register(
  `${PLUGIN_NAME}[${SearchEngines.GOOGLE}] generator`,
  googleGenerator,
);

// CI generator
hexo.extend.generator.register(`${PLUGIN_NAME}[CI] generator`, CIGenerators);

// batch deployer
hexo.extend.deployer.register(PLUGIN_NAME, async () => {
  return await deploys(hexo as IHexo);
});
