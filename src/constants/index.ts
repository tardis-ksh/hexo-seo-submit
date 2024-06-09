export const PLUGIN_NAME = 'hexo-seo-submit';

export enum SearchEngines {
  BAIDU = 'baidu',
  BING = 'bing',
  GOOGLE = 'google',
}

export enum SortBy {
  UPDATED = 'updated',
  CREATED = 'created',
}

export const FILE_ROOT_PATH = 'hexo-seo-submit';

export const SearchEngineApiUri = {
  [SearchEngines.BAIDU]: 'http://data.zz.baidu.com/urls',
  [SearchEngines.BING]:
    'https://ssl.bing.com/webmaster/api.svc/pox/SubmitUrlBatch',
  [SearchEngines.GOOGLE]: 'https://indexing.googleapis.com/batch',
};

export const CONTENT_SEPARATOR = '\n';
