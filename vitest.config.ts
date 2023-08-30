import fs from 'fs';
import ci from 'ci-info';
import { defineConfig } from 'vitest/config';
import { guard } from './src/common/type';

export default defineConfig(() => {
	const timeOut = 300_000;

	return {
		clearScreen: ci.isCI,
		test: {
			watch: false,
			testTimeout: timeOut,
			hookTimeout: timeOut,
			teardownTimeout: timeOut,
			env: ci.isCI
				? undefined
				: fs
						.readFileSync('.env', {
							encoding: 'utf-8',
						})
						.split('\n')
						.filter(Boolean)
						.reduce((prev, keyValuePair) => {
							const [key, value] = keyValuePair.split('=');
							return {
								...prev,
								[guard({
									value: key,
									error: new Error('key is undefined'),
								})]: value,
							};
						}, {}),
		},
	};
});
