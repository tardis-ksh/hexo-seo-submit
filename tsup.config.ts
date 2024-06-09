import { defineConfig, type Options } from 'tsup';
import * as path from 'node:path';

const baseConfig: Partial<Options> = {
  format: ['cjs'], // CommonJS
  platform: 'node',
  dts: false, // 生成 .d.ts 声明文件
  sourcemap: true,
  clean: true, // 构建前清理输出目录
  minify: false, // 压缩代码
  target: 'es6',
  // splitting: false, // 禁用代码拆分
  bundle: true, // 启用代码打包

  splitting: true,
  esbuildOptions: (options) => {
    options.alias = {
      '@': path.resolve(process.cwd(), 'src'),
    };
  },
  treeshake: true,
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['src/index.ts'],
    outDir: 'dist',
  },
  {
    ...baseConfig,
    entry: ['src/bin/index.ts'],
    outDir: 'dist/bin',
    sourcemap: false,
  },
  // {
  //   ...baseConfig,
  //   entry: ['bin/hexo-seo-submit.ts'],
  //   outDir: 'bin',
  //   dts: false,
  //   clean: false,
  //   sourcemap: false,
  // },
]);
