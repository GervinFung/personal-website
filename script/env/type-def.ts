import { genEnvTypeDef } from 'gen-env-type-def';

genEnvTypeDef([
	{
		inDir: '.',
		envType: 'process.env',
	},
]);
