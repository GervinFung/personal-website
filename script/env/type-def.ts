import { genEnvTypeDef } from 'gen-env-type-def';

const main = () => {
	genEnvTypeDef([
		{
			inDir: 'config',
			envType: 'process.env',
			outDir: '.',
			allowStringType: {
				for: 'some',
				case: 'include',
				variables: ['NEXT_PUBLIC_NODE_ENV'],
			},
		},
	]);
};

main();
