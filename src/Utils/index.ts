import path from 'node:path';

import chalk from 'chalk';

import {
  FILE_ROOT_PATH,
  PLUGIN_NAME,
  SearchEngines,
  SortBy,
} from '@/constants';
import Hexo from '@/types/hexo';
import { SeoHexoConfig } from '@/types';

export const descendingOrderPosts = (data: Hexo['Posts'], sortBy: SortBy) => {
  const nextData = data?.slice() || [];
  return nextData?.sort((a, b) => {
    return b[sortBy] - a[sortBy];
  });
};

export const getPostUrls = (
  posts: Hexo['Site']['posts'],
  seoConfig: SeoHexoConfig[SearchEngines],
) => {
  let nextPosts = posts.toArray()?.slice() || [];

  nextPosts = nextPosts?.map((post) => {
    const { date, updated } = post;
    return {
      ...post,
      date: Date.parse(date.format('yyyy-MM-DD HH:mm:ss')),
      updated: Date.parse(updated.format('yyyy-MM-DD HH:mm:ss')),
    };
  });

  const { sortBy = SortBy.CREATED, count } = seoConfig || {};

  const postUrls = descendingOrderPosts(
    nextPosts?.slice(0, count || undefined),
    sortBy,
  )?.map((post) => post.permalink);

  return postUrls?.join('\n');
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

    return { enable: false } as SeoHexoConfig[T];
  }

  return config;
};
