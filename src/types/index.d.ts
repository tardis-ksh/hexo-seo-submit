import { CIPlatform, SearchEngines, SortBy } from '@/constants';

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
    // google service accounts key json path
    // use in deploy, you can save anywhere in you project, but no public
    accountKeysJSonFile?: string;
    proxy?: string;
  };
}

export interface GoogleAccountKeysJson {
  private_key: string;
  client_email: string;
}

export interface CIConfig {
  enable?: true;
  cron?: string;
  branch?: string;
  platform?: CIPlatform;
}

export type SeoHexoConfig = {
  [key in SearchEngines]: SearchEngineConfig & DiffEngineConfig[key];
} & {
  // 文章数量
  count?: number;
  // 排序字段
  sortBy?: SortBy;
  fileRootPath?: string;
  CI?: CIConfig;
};
