import dotenv from 'dotenv';
dotenv.config();

export const contactInfo = {
    email: process.env.EMAIL,
    pass: process.env.PASS,
} as const;

export const portfolioInfo = {
    apiKey: process.env.API_KEY,
} as const;
