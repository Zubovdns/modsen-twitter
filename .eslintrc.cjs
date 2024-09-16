module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2015,
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		es6: true,
		browser: true,
		node: true,
		es2020: true,
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'react-hooks',
		'simple-import-sort',
		'react-refresh',
	],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'@typescript-eslint/no-var-requires': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-fallthrough': 'off',
		'no-multiple-empty-lines': [
			1,
			{
				max: 2,
			},
		],
		'arrow-body-style': ['error', 'as-needed'],
		'no-nested-ternary': 1,
		eqeqeq: 2,
		'react/prop-types': 'off',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^\\u0000'],
					['^react', '^next', '^[a-zA-Z]'],
					['^@'],
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
		'simple-import-sort/exports': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
