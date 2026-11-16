export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'docs',
				'style',
				'refactor',
				'perf',
				'test',
				'build',
				'ci',
				'chore',
				'revert',
				'init',
			],
		],
		'scope-case': [2, 'always', 'lower-case'],
		'scope-delimiter-style': [2, 'always', ['/']],
		'header-max-length': [2, 'always', 72],
		'subject-full-stop': [2, 'never', '。'],
		'subject-case': [0],
	},
};
