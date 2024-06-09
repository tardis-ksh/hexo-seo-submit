import path from 'node:path';

import chalk from 'chalk';

import {
  CONTENT_SEPARATOR,
  FILE_ROOT_PATH,
  PLUGIN_NAME,
  SearchEngines,
  SortBy,
} from '@/constants';
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

  const { sortBy, count } = searchEnginConfig || {};
  // get sortBy、count from root config
  const seoConfig = hexo.config[PLUGIN_NAME] as SeoHexoConfig;

  const postUrls = descendingOrderPosts(
    nextPosts,
    sortBy || seoConfig.sortBy || SortBy.CREATED,
  )
    ?.slice(0, count || seoConfig.count || undefined)
    ?.map((post) => post.permalink);

  return postUrls?.join(CONTENT_SEPARATOR);
};

export const combineFilePath = (filePath: string) => {
  return path.join(FILE_ROOT_PATH, filePath);
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
