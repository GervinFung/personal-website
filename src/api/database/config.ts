const mongodbConfig = {
    srv: process.env.MONGO_SRV,
    port: process.env.MONGO_PORT,
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
