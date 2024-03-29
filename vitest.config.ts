import fs from 'fs';
import ci from 'ci-info';
import { defineConfig } from 'vitest/config';
import { Defined, isTruthy } from '@poolofdeath20/util';

export default defineConfig(() => {
	const timeOut = 300_000;

	return {
		clearScreen: ci.isCI,
		test: {
			watch: false,
			testTimeout: timeOut,
			hookTimeout: timeOut,
			teardownTimeout: timeOut,
			env: fs
				.readFileSync('.env', {
					encoding: 'utf-8',
				})
				.split('\n')
				.filter(isTruthy)
				.reduce((prev, keyValuePair) => {
					const [key, value] = keyValuePair.split('=');
					return {
						...prev,
						[Defined.parse(key).orThrow(
							new Error('key is undefined')
						)]: value,
					};
				}, {}),
		},
	};
});
