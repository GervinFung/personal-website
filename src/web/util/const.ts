import { parseAsStringEnv } from 'esbuild-env-parsing';

const url = parseAsStringEnv({
    name: 'ORIGIN',
    env: process.env.NEXT_PUBLIC_ORIGIN,
});

export { url };
