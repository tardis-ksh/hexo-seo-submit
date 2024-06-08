import request from '@/Utils/request';
import { SearchEngineApiUri, SearchEngines } from '@/constants';

interface SubmitParams {
  site: string;
  token: string;
}

export const submitUrlToEngine = (urls: string, params: SubmitParams) => {
  const { site, ...restConfig } = params;

  return request({
    // axios will automatically serialize the params object, like this: https:%2F%2Fksh7.com
    // baidu engine will not accept this, so we need to manually that
    url: `${SearchEngineApiUri[SearchEngines.BAIDU]}?site=${site}`,
    data: urls,
    method: 'post',
    params: restConfig,
    headers: {
      'Content-type': 'text/plain',
    },
  });
};
