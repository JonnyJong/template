import { join } from 'node:path';

import prettier from 'eslint-config-prettier/flat';
import oxlint from 'eslint-plugin-oxlint';
import { defineConfig } from 'eslint/config';

import base from './eslint.base';
import vueBase from './eslint.vue.base';

const OXLINT_CONFIG_PATH = join(import.meta.dirname, 'oxlint.config.ts');
const OXLINT_IGNORE_CONFIG_NAME = 'oxlint/oxlint-config-ignore-patterns';

const oxlintConfig = await oxlint.buildFromConfigFile(OXLINT_CONFIG_PATH);
// 避免 ESLint 跳过 vue
const cleanedOxlintConfig = oxlintConfig
	.map((config) => {
		if (config.name !== OXLINT_IGNORE_CONFIG_NAME) return config;
		config.ignores = config.ignores?.filter((pattern) => pattern !== '**/*.vue');
		return config;
	})
	.filter((config) => {
		if (config.name !== OXLINT_IGNORE_CONFIG_NAME) return true;
		if (config.ignores?.length === 0) return false;
		return true;
	});

export default defineConfig([...base, ...vueBase, prettier, ...cleanedOxlintConfig]);
