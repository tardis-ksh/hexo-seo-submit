import path from 'node:path';
import fsp from 'node:fs/promises';

import chalk from 'chalk';

import {
  CONTENT_SEPARATOR,
  FILE_ROOT_PATH,
  PLUGIN_NAME,
  SearchEngines,
  SortBy,
} from '@/constants';

import { checkUrlPath } from './checkPath';

import Hexo from '@/types/hexo';
import { SeoHexoConfig } from '@/types';

// 根据字段降序
export const descendingOrderPosts = (data: Hexo['Posts'], sortBy: SortBy) => {
  const nextData = data?.slice() || [];
  return nextData?.sort((a, b) => {
    return b[sortBy] - a[sortBy];
  });
};

// 根据 count 获取 post urls
export const getPostUrls = (
  // pages 为 source/_posts 之外的文件夹的 path or permalink
  posts: Hexo['Site']['posts'],
  searchEnginConfig: SeoHexoConfig[SearchEngines],
) => {
  let nextPosts = posts.toArray()?.slice() || [];

  nextPosts = nextPosts?.map((post) => {
    const { date, updated, permalink } = post;
    return {
      permalink,
      [SortBy.CREATED]: Date.parse(date.format('yyyy-MM-DD HH:mm:ss')),
      [SortBy.UPDATED]: Date.parse(updated.format('yyyy-MM-DD HH:mm:ss')),
    };
  });

  const { sortBy, count, includePaths, excludePaths } = searchEnginConfig || {};
  // get sortBy、count from root config
  const seoConfig = hexo.config[PLUGIN_NAME] as SeoHexoConfig;

  const realIncludePaths = includePaths || seoConfig.includePaths;
  const realExcludePaths = excludePaths || seoConfig.excludePaths;

  let postUrls = descendingOrderPosts(
    nextPosts,
    sortBy || seoConfig.sortBy || SortBy.CREATED,
  )?.map((post) => post.permalink);

  if (realIncludePaths?.length || realExcludePaths?.length) {
    postUrls = postUrls.filter((url: string) => {
      const path = new URL(url).pathname;
      const checkInclude = checkUrlPath(realIncludePaths, path);
      const checkExclude = checkUrlPath(realExcludePaths, path);

      // include 规则优先 Exclude
      return checkInclude || !checkExclude;
    });
  }

  // 移至 include exclude 后
  postUrls = postUrls?.slice(0, count || seoConfig.count || undefined);

  return postUrls?.join(CONTENT_SEPARATOR);
};

export const combineFilePath = (filePath: string) => {
  const pluginConfig = hexo.config[PLUGIN_NAME] as SeoHexoConfig;
  return path.join(pluginConfig.fileRootPath ?? FILE_ROOT_PATH, filePath);
};

export const getSearchEngineConfig = <
  T extends SearchEngines = SearchEngines.BAIDU,
>(
  engineName: SearchEngines,
) => {
  const config = hexo.config[PLUGIN_NAME][engineName] as SeoHexoConfig[T];
  if (typeof config !== 'object') {
    console.log(
      chalk.bgRed(`${PLUGIN_NAME}: wrong search engine config, please check`),
    );

    return {} as SeoHexoConfig[T];
  }

  return (config || {}) as SeoHexoConfig[T];
};

export const getSiteDomain = () => {
  return hexo.config.url;
};

export const getFileContent = async (filePath) => {
  return await fsp.readFile(path.join(process.cwd(), filePath), 'utf8');
};
