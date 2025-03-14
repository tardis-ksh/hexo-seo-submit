import { defineConfig, type Options } from 'tsup';
import * as path from 'node:path';
import fsp from 'node:fs/promises';

const getVersion = async () => {
  const packageJson = await fsp.readFile(
    path.resolve(__dirname, 'package.json'),
    'utf8',
  );

  return JSON.parse(packageJson)?.version;
};

const baseConfig: Partial<Options> = {
  format: ['esm'], // CommonJS
  platform: 'node',
  dts: false, // 生成 .d.ts 声明文件
  sourcemap: false,
  clean: true, // 构建前清理输出目录
  minify: true, // 压缩代码
  target: 'esnext',
  // splitting: false, // 禁用代码拆分
  bundle: true, // 启用代码打包

  splitting: true,
  define: {
    PACKAGE_VERSION: JSON.stringify(await getVersion()),
  },
  esbuildOptions: async (options) => {
    options.alias = {
      '@': path.resolve(process.cwd(), 'src'),
    };
  },
  treeshake: true,
  onSuccess: 'cpx "src/handlebars/template/*" dist/handlebars/template',
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    outDir: 'dist',
  },
  {
    ...baseConfig,
    entry: ['src/bin/index.ts'],
    outDir: 'dist/bin',
  },
]);
