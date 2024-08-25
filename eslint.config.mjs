import process from 'process';

import { fixupPluginRules, includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
// @ts-expect-error: Missing types for '@next/eslint-plugin-next'
import eslintPluginNext from '@next/eslint-plugin-next';
// @ts-expect-error: Missing types for 'eslint-plugin-import'
import eslintPluginImport from 'eslint-plugin-import';
// @ts-expect-error: Missing types for 'eslint-plugin-react'
import eslintPluginReact from 'eslint-plugin-react';
// @ts-expect-error: Missing types for 'eslint-plugin-react-hooks'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
const importRules = Object.keys(eslintPluginImport.rules).reduce(
	(rules, rule) => {
		return {
			...rules,
			[`import/${rule}`]: 'error',
		};
	},
	{}
);

const base = {
	linterOptions: {
		reportUnusedDisableDirectives: 'error',
	},
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
	plugins: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		import: fixupPluginRules(eslintPluginImport),
	},
	rules: {
		...{
			...importRules,
			['import/no-unresolved']: 'off',
			['import/no-nodejs-modules']: 'off',
			['import/no-internal-modules']: 'off',
			['import/default']: 'off',
			['import/namespace']: 'off',
			['import/no-deprecated']: 'off',
			['import/prefer-default-export']: 'off',
			['import/no-named-as-default']: 'off',
			['import/no-named-as-default-member']: 'off',
			['import/no-relative-parent-imports']: 'off',
			'import/max-dependencies': [
				'error',
				{
					max: 16,
					ignoreTypeImports: true,
				},
			],
			'import/extensions': [
				'error',
				{
					json: 'always',
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						'type',
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/no-unassigned-import': [
				'error',
				{
					allow: ['**/*.css'],
				},
			],
		},
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'generic',
			},
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^ignore',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'arrow-body-style': ['error', 'always'],
		'no-restricted-syntax': [
			'error',
			{
				selector: 'TSEnumDeclaration',
				message: "Don't declare enums",
			},
		],
	},
};

export default tseslint.config(
	includeIgnoreFile(`${process.cwd()}/.gitignore`),
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		...base,
		files: ['**/*.tsx'],
		settings: {
			react: {
				version: 'detect',
			},
		},
		languageOptions: {
			parserOptions: {
				...base.languageOptions.parserOptions,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			...base.plugins,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			react: fixupPluginRules(eslintPluginReact),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			'react-hooks': fixupPluginRules(eslintPluginReactHooks),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			'@next/next': fixupPluginRules(eslintPluginNext),
		},
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		rules: {
			...base.rules,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...eslintPluginNext.configs['core-web-vitals'].rules,
			...{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				...eslintPluginReact.configs.all.rules,
				'react/jsx-filename-extension': [
					'error',
					{
						extensions: ['.tsx'],
					},
				],
				'react/jsx-indent-props': ['error', 'tab'],
				'react/jsx-indent': ['error', 'tab'],
				'react/jsx-newline': 'off',
				'react/function-component-definition': [
					'error',
					{
						namedComponents: 'arrow-function',
					},
				],
				'react/destructuring-assignment': 'off',
				'react/jsx-one-expression-per-line': 'off',
				'react/no-multi-comp': 'off',
				'react/jsx-no-literals': 'off',
				'react/jsx-props-no-spreading': 'off',
				'react/jsx-max-props-per-line': 'off',
				'react/jsx-no-bind': [
					'error',
					{
						allowArrowFunctions: true,
					},
				],
				'react/jsx-fragments': ['error', 'element'],
				'react/prop-types': 'off',
				'react/jsx-uses-react': 'off',
				'react/react-in-jsx-scope': 'off',
				'react/jsx-max-depth': 'off',
				'react/forbid-component-props': [
					'error',
					{
						forbid: [
							{
								propName: 'style',
								allowedFor: ['Link', 'Image'],
								message:
									'Props "style" is forbidden for all components except "Link" and "Image"',
							},
						],
					},
				],
			},
			...{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				...eslintPluginReactHooks.configs.recommended.rules,
			},
		},
	},
	{
		files: ['script/mongo-setup/document.js'],
		rules: {
			'no-undef': 'off',
		},
		extends: [tseslint.configs.disableTypeChecked],
	},
	base
);
