import { SearchEngines } from '@/constants';
import { SeoHexoConfig } from '@/types';

import generators from '@/generators';

const DefaultConfig: SeoHexoConfig = {
  [SearchEngines.BAIDU]: { enable: true },
  [SearchEngines.BING]: { enable: true },
  [SearchEngines.GOOGLE]: { enable: true },
};

hexo.config['hexo-seo-submit'] = Object.assign(
  DefaultConfig,
  hexo.config['hexo-seo-submit'],
);

hexo.extend.generator.register('hexo-seo-submit-generator', generators);
