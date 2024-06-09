import { type AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { GoogleAuth } from 'google-auth-library';

import request from '@/Utils/request';

import { GoogleAccountKeysJson } from '@/types';
import { SearchEngineApiUri, SearchEngines } from '@/constants';

interface BatchSubmitUrlParams {
  urlList: string[];
  secretsConfig: GoogleAccountKeysJson;
  proxy?: string;
}

// why return any?
// The inferred type of  cannot be named without a reference to,
// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
// need define returnType manually
export const getGoogleAccessToken = async (
  secretsConfig: GoogleAccountKeysJson,
): Promise<any> => {
  // set OAuth 2.0
  const auth = new GoogleAuth({
    credentials: {
      client_email: secretsConfig.client_email,
      private_key: secretsConfig.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const client = await auth.getClient();
  return await client.getAccessToken();
};

export const batchSubmitUrl = async (data: BatchSubmitUrlParams) => {
  const { urlList, secretsConfig, proxy } = data;
  const axiosConfig: Partial<AxiosRequestConfig> = {};

  // set proxy
  if (proxy) {
    const httpsAgent = new HttpsProxyAgent(proxy);

    axiosConfig.proxy = false;
    axiosConfig.httpsAgent = httpsAgent;

    process.env.HTTPS_PROXY = proxy;
    process.env.HTTP_PROXY = proxy;
  }

  const accessToken = await getGoogleAccessToken(secretsConfig);
  const boundary = `===============${Math.round(Math.random() * 200000)}==`;
  const batchRequest = urlList.map((url) => {
    return {
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED',
      }),
    };
  });
  const wrapSymbol = '\n';
  const batchBody = batchRequest
    .map(
      (req) =>
        `\r\n--${boundary}${wrapSymbol}Content-Type: application/http ${wrapSymbol}Content-Transfer-Encoding: binary ${wrapSymbol}\r\nPOST /v3/urlNotifications:publish ${wrapSymbol}Content-Type: application/json ${wrapSymbol}accept: application/json ${wrapSymbol}Content-Length:${req.body.length}${wrapSymbol}\r\n${req.body}`,
    )
    .join('');

  return request({
    method: 'post',
    url: SearchEngineApiUri[SearchEngines.GOOGLE],
    headers: {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': `multipart/mixed; boundary=${boundary}`,
    },
    data: batchBody,
    ...axiosConfig,
  });
};
