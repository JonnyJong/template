import { globSync } from 'node:fs';
import { join } from 'node:path';

import js from '@eslint/js';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const ASCII_ONLY = { regex: '^[\\x00-\\x7F]+$', match: true };

/** 收集项目中 `.gitignore` 忽略的文件 */
function includeAllGitignores(rootDir: string) {
	const ignoreFiles = globSync('**/.gitignore', {
		cwd: rootDir,
		exclude: (path) => path.includes('node_modules') || path.includes('.git/'),
	}).map((file) => join(rootDir, file));

	if (ignoreFiles.length === 0) return [];

	return includeIgnoreFile(ignoreFiles, { gitignoreResolution: true });
}

export default defineConfig([
	includeAllGitignores(import.meta.dirname),

	js.configs.recommended,
	...ts.configs.recommended,

	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			// 禁止未定义：oxlint 不完全支持
			'no-undef': 'error',
			// 命名规则
			'@typescript-eslint/naming-convention': [
				'warn',
				{ selector: 'default', format: null, custom: ASCII_ONLY },
				{
					selector: 'variable',
					modifiers: ['const'],
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					custom: ASCII_ONLY,
				},
				{
					selector: 'classProperty',
					modifiers: ['static', 'readonly'],
					format: ['UPPER_CASE', 'PascalCase'],
					custom: ASCII_ONLY,
				},
				{ selector: 'typeAlias', format: ['PascalCase'], custom: ASCII_ONLY },
				{ selector: 'typeLike', format: ['PascalCase'], custom: ASCII_ONLY },
				{ selector: 'enumMember', format: ['UPPER_CASE'], custom: ASCII_ONLY },
			],
			// 禁止 `node:assert`，改用 `node:assert/strict`
			'no-restricted-imports': [
				'warn',
				{
					paths: [
						{ name: 'assert', message: 'Use `node:assert/strict` instead.' },
						{ name: 'node:assert', message: 'Use `node:assert/strict` instead.' },
					],
				},
			],
			// 引号：优先单引号，使用 `` ` `` 避免转义
			quotes: ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
			// 其它补充规则
			'no-restricted-syntax': [
				'error',
				// useWhile
				{
					selector: 'ForStatement[init=null][update=null]',
					message:
						'Use a `while` loop when the initializer and update expressions are unnecessary.',
				},
				// noEnum
				{
					selector: 'TSEnumDeclaration[const=false]',
					message: 'Do not use TypeScript `enum`; use a union type or a const object instead.',
				},
				// useConsistentBuiltinInstantiation：内建构造器使用 `new`
				{
					selector:
						'CallExpression[callee.name=/^(AggregateError|EvalError|RangeError|ReferenceError|SyntaxError|TypeError|URIError)$/]',
					message: 'Call this constructor with `new`.',
				},
				// useTopLevelRegex
				{
					selector: ':function Literal[regex.flags=/^[^gy]*$/]',
					message: 'Move this regular expression literal to the top level.',
				},
				// useSimplifiedLogicExpression
				{
					selector:
						':matches(IfStatement, WhileStatement, DoWhileStatement, ForStatement, ConditionalExpression) > LogicalExpression[operator="&&"][right.type="Literal"][right.value=true]',
					message: 'Logical expression contains unnecessary complexity: `x && true` is just `x`.',
				},
				{
					selector:
						':matches(IfStatement, WhileStatement, DoWhileStatement, ForStatement, ConditionalExpression) > LogicalExpression[operator="||"][right.type="Literal"][right.value=false]',
					message: 'Logical expression contains unnecessary complexity: `x || false` is just `x`.',
				},
				{
					selector:
						'UnaryExpression[operator="!"] > LogicalExpression[operator="&&"][right.type="Literal"][right.value=true]',
					message:
						'Logical expression contains unnecessary complexity: `!(x && true)` is just `!x`.',
				},
				{
					selector:
						'UnaryExpression[operator="!"] > LogicalExpression[operator="||"][right.type="Literal"][right.value=false]',
					message:
						'Logical expression contains unnecessary complexity: `!(x || false)` is just `!x`.',
				},
			],
		},
	},
	// CommonJS 环境
	{
		files: ['**/*.{cjs,cts}'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: { ...globals.node, ...globals.commonjs },
		},
		rules: {
			strict: ['warn', 'global'],
		},
	},
]);
