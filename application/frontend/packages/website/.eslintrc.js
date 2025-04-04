module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'jquery': true,
	},
	'extends': [
		'../../.eslintrc.js',
	],
	'globals': {
		'__': 'readonly',
		'moment': true,
		'ace': true,
		'reducerTest': true,
		'AmCharts': true,
		'io': true,
	},
	'parser': '@typescript-eslint/parser',
	'ignorePatterns': ['fixtures/**/*', 'assets/**/*'],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint',
		'eslint-plugin-import',
		'eslint-plugin-unicorn',
		'@typescript-eslint/tslint'
	],
};
