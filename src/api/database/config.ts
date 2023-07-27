import { parseProcessEnv } from '../../common/string';

const environment = process.env.NEXT_PUBLIC_NODE_ENV;

const mongodbConfig = {
    srv:
        environment === 'test' || environment === 'development'
            ? undefined
            : parseProcessEnv({
                  name: 'MONGO_SRV',
                  value: process.env.MONGO_SRV,
              }),
    port:
        environment === 'staging' || environment === 'production'
            ? undefined
            : parseProcessEnv({
                  name: 'MONGO_PORT',
                  value: process.env.MONGO_PORT,
              }),
    dbName: parseProcessEnv({
        name: 'MONGO_DB',
        value: process.env.MONGO_DB,
    }),
    address: parseProcessEnv({
        name: 'MONGO_ADDRESS',
        value: process.env.MONGO_ADDRESS,
    }),
    collections: {
        contactFormMessage: parseProcessEnv({
            name: 'MONGO_COLLECTION_CONTACT_FORM_MESSAGE',
            value: process.env.MONGO_COLLECTION_CONTACT_FORM_MESSAGE,
        }),
    },
    auth: {
        user: parseProcessEnv({
            name: 'MONGO_USER',
            value: process.env.MONGO_USER,
        }),
        password: parseProcessEnv({
            name: 'MONGO_PASSWORD',
            value: process.env.MONGO_PASSWORD,
        }),
    },
} as const;

export default mongodbConfig;
