import { parseProcessEnv } from '../../common/string';

const links = {
    gmail: 'gervinfungdaxuen@gmail.com',
    github: 'https://github.com/GervinFung',
    instagram: 'https://www.instagram.com/poolofdeath20',
    linkedin: 'https://www.linkedin.com/in/gervin-fung-387409209',
    domain: parseProcessEnv({
        name: 'NEXT_PUBLIC_ORIGIN',
        value: process.env.NEXT_PUBLIC_ORIGIN,
    }),
} as const;

export default links;
