import chalk from 'chalk';
import nodePath from 'node:path';
import fsp from 'node:fs/promises';

import generateTemplate from '@/handlebars';

import Hexo from '@/types/hexo';
import { CIPlatform, PLUGIN_NAME, SearchEngines } from '@/constants';
import { SeoHexoConfig } from '@/types';
import { combineFilePath, getSiteDomain } from '@/Utils';

const moduleName = `${PLUGIN_NAME}[CI]:`;
const getTemplateContent = async (path) => {
  return await fsp.readFile(nodePath.join(__dirname, path), 'utf-8');
};

const CIGenerators = async (): Hexo['Return'] => {
  const pluginConfig = hexo.config[PLUGIN_NAME] as SeoHexoConfig;
  const CIConfig = pluginConfig.CI;
  if (!CIConfig || !CIConfig?.enable) {
    return;
  }
  console.log(chalk.bgGreen(`${moduleName} running.`));

  const { cron, branch } = CIConfig;
  const searchEngineConfig = Object.values(SearchEngines)
    .map((key) => {
      return {
        ...pluginConfig[key],
        key,
      } as SeoHexoConfig[SearchEngines] & { key: SearchEngines };
    })
    .filter((config) => config.enable)
    .reduce((acc, config) => {
      const { enable, path, key } = config || {};

      acc[key] = {
        enable: enable,
        file: combineFilePath(path),
        name: key,
      };
      return acc;
    }, {} as any);

  if (!Object.keys(searchEngineConfig).length) {
    console.log(
      chalk.bgRed(
        `${moduleName} error, no search engine enabled, please check your config`,
      ),
    );
    return;
  }

  const platformConfig = {
    [CIPlatform.GITHUB]: {
      schedule: {
        cron,
      },
      site: getSiteDomain(),
      path: `.github/workflows/${PLUGIN_NAME}.yml`,
      templateFile: await getTemplateContent('handlebars/template/actions.tpl'),
      branch,
      ...searchEngineConfig,
    },
  };
  const currentPlatformConfig = platformConfig[CIConfig.platform];

  if (!currentPlatformConfig) {
    chalk.bgRed(
      `${moduleName} error, no platform found, please check your config`,
    );
    return;
  }

  const templateContent = generateTemplate(
    currentPlatformConfig.templateFile,
    currentPlatformConfig,
  );

  return {
    path: currentPlatformConfig.path,
    data: templateContent,
  };
};

export default CIGenerators;
