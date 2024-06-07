import eslint from '@eslint/js';
import typescriptEslintParser from '@typescript-eslint/parser';
import tsEslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

// extends in flat config@9.x
const flatConfigs = [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  // For flat configuration, this plugin ships with an eslint-plugin-prettier/recommended config that sets up both
  // eslint-plugin-prettier and eslint-config-prettier in one go.
  // and Enable the prettier/prettier rule
  eslintPluginPrettierRecommended,
  {
    name: 'base-config',
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 2020,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
    },
  },
  // 如果你想要全局配置改规则，你需要在一个对象中仅声明该值
  // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['src/**/*.ts', '*.{ts,js}'],
  },
  {
    rules: {
      // 'prettier/prettier': 'warn',
    },
  },
];

export default tsEslint.config(
  ...tsEslint.configs.recommended,
  ...flatConfigs,
);
