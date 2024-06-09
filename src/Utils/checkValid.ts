import { SearchEngineConfig } from '@/types';
import { BatchSubmitConfig } from '@/deploys/Google/type';

export const checkSearchEngineConfig = (config: SearchEngineConfig) =>
  new Promise((resolve, reject) => {
    if (!Object.keys(config || {}).length) {
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

export const checkGoogleConfig = (config: BatchSubmitConfig) => {
  return new Promise((resolve, reject) => {
    if (!config) {
      reject(new Error('no config here'));
      return;
    }
    const { file, accountKeysJSon, accountKeysJSonFile } = config;
    if (!file) {
      reject(new Error('Where are files?'));
      return;
    }
    if (!accountKeysJSon && !accountKeysJSonFile) {
      reject(new Error('Where are accountKeys?'));
      return;
    }
    resolve('done');
    return;
  });
};
