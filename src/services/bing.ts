import request from '@/Utils/request';
import { SearchEngineApiUri, SearchEngines } from '@/constants';

interface SubmitParams {
  apiKey: string;
  siteUrl: string;
}

export const submitUrlToEngine = (urls: string[], params: SubmitParams) => {
  const { apiKey, siteUrl } = params;
  return request({
    url: SearchEngineApiUri[SearchEngines.BING],
    method: 'post',
    params: { apiKey },
    data: {
      urlList: urls,
      siteUrl,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
