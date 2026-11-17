import { join } from 'node:path';

import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import oxlint from 'eslint-plugin-oxlint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	js.configs.recommended,
	prettier,
	...oxlint.buildFromOxlintConfigFile(join(import.meta.dirname, 'oxlint.config.ts')),
]);
