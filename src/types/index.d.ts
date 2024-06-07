import { SearchEngines, SortBy } from '@/constants';

export interface SearchEngineConfig {
  enable?: boolean;
  // 文章数量
  count?: number;
  // 排序字段
  sortBy?: SortBy;
  // 文件路径
  path?: string;
}

interface DiffEngineConfig {
  [SearchEngines.BAIDU]: {
    // baidu 推送 token
    token?: string;
  };
  [SearchEngines.BING]: {
    // bing api key
    apiKey?: string;
  };
  [SearchEngines.GOOGLE]: {
    // google index key
    privateKey?: string;
    // google client emall
    clientEmail?: string;
  };
}

export type SeoHexoConfig = {
  [key in SearchEngines]: SearchEngineConfig & DiffEngineConfig[key];
} & {
  // 文章数量
  count?: number;
  // 排序字段
  sortBy?: SortBy;
};
