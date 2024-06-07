import { SearchEngineConfig } from '@/types';

export const checkSearchEngineConfig = (config: SearchEngineConfig) =>
  new Promise((resolve, reject) => {
    if (!Object.keys(config).length) {
      reject(new Error('exit~ can not find any config'));
      return;
    }

    const { enable } = config;

    if (typeof enable !== 'boolean' || !enable) {
      reject(new Error('exit~ this engine is not enabled'));
      return;
    }

    resolve('success');
    return;
  });
