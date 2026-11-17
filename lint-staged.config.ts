export default {
	// oxlint 不完全支持 Vue SFC，由 eslint 处理
	'*.vue': ['oxfmt --write', 'eslint --fix'],
	// oxlint 处理，eslint 补漏
	'*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': ['oxfmt --write', 'oxlint --fix', 'eslint --fix'],
	// 纯格式化
	'*.{json,jsonc}': ['oxfmt --write'],
};
