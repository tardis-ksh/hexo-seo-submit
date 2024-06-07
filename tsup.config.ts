import { defineConfig } from 'tsup';
import * as path from 'node:path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'], // CommonJS
  platform: 'node',
  dts: true, // 生成 .d.ts 声明文件
  sourcemap: false,
  clean: true, // 构建前清理输出目录
  minify: true, // 压缩代码
  target: 'es6',
  splitting: false, // 禁用代码拆分
  bundle: true, // 启用代码打包
  outDir: 'dist',
  esbuildOptions: (options) => {
    options.alias = {
      '@': path.resolve(process.cwd(), 'src'),
    };
  },
});
