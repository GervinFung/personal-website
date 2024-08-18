import process from 'process';

import { fixupPluginRules, includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
// @ts-expect-error: Missing types for 'eslint-plugin-import'
import eslintPluginImport from 'eslint-plugin-import';
// @ts-expect-error: Missing types for 'eslint-plugin-react'
import eslintPluginReact from 'eslint-plugin-react';
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

export default tseslint.config(
	includeIgnoreFile(`${process.cwd()}/.gitignore`),
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		files: ['script/mongo-setup/document.js'],
		rules: {
			'no-undef': 'off',
		},
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
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
	}
);
