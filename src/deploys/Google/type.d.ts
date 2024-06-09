import { SeoHexoConfig } from '@/types';
import { SearchEngines } from '@/constants';

type EngineConfig = SeoHexoConfig[SearchEngines.GOOGLE];

export interface BatchSubmitConfig {
  file: EngineConfig['path'];
  accountKeysJSon?: string;
  accountKeysJSonFile?: string;
  proxy?: EngineConfig['proxy'];
}
