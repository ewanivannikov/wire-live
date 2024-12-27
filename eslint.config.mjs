import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  ...compat.extends('eslint-config-standard'),
  ...compat.extends('eslint-config-prettier'),
  ...tseslint.configs.recommended,
  ...compat.extends({rules: {
    "no-useless-constructor": false
  }})
);
