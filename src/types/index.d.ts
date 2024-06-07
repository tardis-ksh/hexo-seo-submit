import { SearchEngines, SortBy } from '@/constants';

export interface SearchEngineConfig {
  enable?: boolean;
  // 文章数量
  count?: number;
  // 排序字段
  sortBy?: SortBy;
}

export type SeoHexoConfig = {
  [key in SearchEngines]: SearchEngineConfig;
};
