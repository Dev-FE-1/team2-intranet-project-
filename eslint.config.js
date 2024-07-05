import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: ['dist', 'node_modules', 'public'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  pluginJs.configs.recommended,
];
