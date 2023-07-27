const environment = process.env.NEXT_PUBLIC_NODE_ENV;

const mongodbConfig = {
    srv:
        environment === 'test' || environment === 'development'
            ? undefined
            : process.env.MONGO_SRV,
    port:
        environment === 'staging' || environment === 'production'
            ? undefined
            : process.env.MONGO_PORT,
    dbName: process.env.MONGO_DB,
    address: process.env.MONGO_ADDRESS,
    collections: {
        contactFormMessage: process.env.MONGO_COLLECTION_CONTACT_FORM_MESSAGE,
    },
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
    },
} as const;

export default mongodbConfig;
