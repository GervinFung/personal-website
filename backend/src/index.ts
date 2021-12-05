import express from 'express';
import {
    fetchRepositories as getRepositories,
    portfolioLanguagesList,
    queryPortfolioForPaging as paginatePortfolio,
    queryPortfolioFromLanguage as findPortfoliosFromLanguage,
    parsePageQuery,
    findLanguageQueried,
} from './util/portfolio';
import {
    getName,
    getEmail,
    getMessage,
    allValueValid,
    Data,
} from './util/contact';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

const { static: expressStatic, json, urlencoded } = express;
const app = express();
const port = process.env.PORT || 8080;

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));
app.listen(port, () => console.log(`Express listening at port ${port}`));
dotenv.config();

const returnResponse = async ({
    language,
    numberOfPortfolioPerPage,
    pageNumber,
}: {
    readonly pageNumber: number;
    readonly numberOfPortfolioPerPage: number;
    readonly language: string;
}) => {
    const portfolioData = getRepositories();

    const selectedLanguage = findLanguageQueried(portfolioData, language);
    const portfolioQueried = findPortfoliosFromLanguage(
        portfolioData,
        selectedLanguage
    );

    return {
        numberOfPagesQueried: Math.ceil(
            portfolioQueried.length / numberOfPortfolioPerPage
        ),
        portfolioLanguages: portfolioLanguagesList(portfolioData),
        portfolioPaginated: paginatePortfolio(portfolioQueried, pageNumber),
        selectedLanguage,
    };
};

app.get('/api/portfolio', async (req, res) => {
    if (req.method === 'GET') {
        const numberOfPortfolioPerPage = 9;
        const page = req.query.page;
        const language = req.query.language;
        if (typeof page === 'string' && typeof language === 'string') {
            const paging = parsePageQuery(page, numberOfPortfolioPerPage);
            res.status(200).json(
                await returnResponse({
                    language,
                    numberOfPortfolioPerPage,
                    pageNumber: paging,
                })
            );
        } else {
            res.status(200).json(
                await returnResponse({
                    language: 'All',
                    numberOfPortfolioPerPage,
                    pageNumber: 0,
                })
            );
        }
    } else {
        throw new Error('Only accept GET request');
    }
});

app.post('/api/contact', (req, res) => {
    if (req.method === 'POST') {
        const body = req.body;
        const name = getName(body.name);
        const email = getEmail(body.email);
        const message = getMessage(body.message);

        if (allValueValid(name, email, message)) {
            const myEmail = process.env.EMAIL;
            const options = {
                from: `${name.value.trim()} <${myEmail}>`,
                to: `Gervin Fung Da Xuen <${myEmail}>`,
                subject: 'Personal Website Contact Form',
                text: `Hello, my name is ${name.value.trim()}\n\nYou can reach me at ${
                    email.value
                }\n\nI would like to ${message.value.trim()}`,
            };
            nodemailer
                .createTransport({
                    host: 'smtp-mail.outlook.com',
                    port: 587,
                    secure: false,
                    tls: {
                        ciphers: 'SSLv3',
                    },
                    auth: {
                        user: myEmail,
                        pass: process.env.PASS,
                    },
                })
                .sendMail(options, (error) => {
                    res.status(200).json(
                        (error
                            ? {
                                  type: 'failed',
                              }
                            : {
                                  type: 'succeed',
                                  name: {
                                      ...name,
                                      value: '',
                                  },
                                  email: {
                                      ...email,
                                      value: '',
                                  },
                                  message: {
                                      ...message,
                                      value: '',
                                  },
                              }) as Data
                    );
                });
        } else {
            res.status(200).json({
                type: 'input',
                name,
                email,
                message,
            } as Data);
        }
    } else {
        throw new Error('Only accept POST request');
    }
});

const build = '../frontend/build';
app.use(expressStatic(path.resolve(build)));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
});
