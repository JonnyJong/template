import type { Linter } from 'eslint';
import vue from 'eslint-plugin-vue';
import ts from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
	...vue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				// `<script>` 块使用 typescript-eslint 的 parser 解析
				parser: ts.parser,
				extraFileExtensions: ['.vue'],
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		rules: {
			// strongly-recommended
			'vue/attribute-hyphenation': ['warn', 'always'],
			'vue/component-definition-name-casing': ['warn', 'PascalCase'],
			'vue/no-template-shadow': 'warn',
			'vue/one-component-per-file': 'warn',
			'vue/prop-name-casing': ['warn', 'camelCase'],
			'vue/require-default-prop': 'warn',
			'vue/require-explicit-emits': 'warn',
			'vue/require-prop-types': 'warn',
			'vue/v-bind-style': ['warn', 'shorthand'],
			'vue/v-on-event-hyphenation': ['warn', 'always'],
			'vue/v-on-style': ['warn', 'shorthand'],
			'vue/v-slot-style': ['warn', 'shorthand'],
			// recommended
			'vue/attributes-order': 'warn',
			'vue/block-order': ['warn', { order: ['script', 'template', 'style'] }],
			'vue/no-lone-template': 'warn',
			'vue/no-multiple-slot-args': 'warn',
			'vue/no-required-prop-with-default': 'warn',
			'vue/no-v-html': 'warn',
			'vue/order-in-components': 'warn',
			'vue/this-in-template': 'warn',
		} satisfies Linter.RulesRecord,
	},
];
