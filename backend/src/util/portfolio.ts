import { portfolioInfo } from '../config/config';
import fetch from 'node-fetch';
import { parseAsString } from 'parse-dont-validate';

export type PortfolioData = {
    readonly name: string;
    readonly description: string;
    readonly language: string;
    readonly url: string;
};

export type Data = {
    readonly numberOfPagesQueried: number;
    readonly portfolioLanguages: ReadonlyArray<string>;
    readonly portfolioPaginated: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
};

const fetchGithubUser = async (): Promise<ReadonlyArray<PortfolioData>> => {
    const repositories = await (
        await fetch(
            'https://api.github.com/users/GervinFung/repos?per_page=50',
            {
                method: 'GET',
                headers: {
                    Authorization: `token ${portfolioInfo.apiKey}`,
                },
            }
        )
    ).json();
    if (Array.isArray(repositories)) {
        return repositories.flatMap((repo) => {
            const { name, language, html_url, description } = repo;
            const parsedName = parseAsString(name).orElseThrowError('name');
            const repoName = [
                'LibGDX-Chess-Game',
                'MinimalTicTacToe',
                'TextEditorFX',
                'SimpleParallelChessAI',
                'AndroidSimpleAIChess',
                'Connect4',
                'TicTacToe',
                'TextEditor',
                'RealTimeMarkdown',
                'Room',
                'KnapsackProblem',
                'SimpleParallelDispatcher',
            ].find((portfolioName) => parsedName === portfolioName);
            if (repoName) {
                return [
                    {
                        name: parsedName,
                        language:
                            parseAsString(language).orElseThrowError(
                                'language'
                            ),
                        description:
                            parseAsString(description).orElseThrowError(
                                'description'
                            ),
                        url: parseAsString(html_url).orElseThrowError(
                            'html_url'
                        ),
                    },
                ];
            }
            return [];
        });
    }
    throw new Error('Response returned from Github User API is not array type');
};

const fetchGithubOrganization = async (): Promise<PortfolioData> => {
    const repositories = await (
        await fetch('https://api.github.com/orgs/P-YNPM/repos', {
            method: 'GET',
            headers: {
                Authorization: `token ${portfolioInfo.apiKey}`,
            },
        })
    ).json();
    if (Array.isArray(repositories)) {
        const { language } = Array.from(
            repositories
                .reduce((prev: Map<string, number>, repo) => {
                    const { language } = repo;
                    const parsedLanguage =
                        parseAsString(language).orElseThrowError('language');
                    if (parsedLanguage) {
                        const prevItem = prev.get(parsedLanguage);
                        return prev.set(
                            language,
                            prevItem === undefined ? 1 : prevItem + 1
                        );
                    }
                    return prev;
                }, new Map<string, number>())
                .entries()
        ).reduce(
            (prev, [language, count]) => {
                return prev.count < count
                    ? {
                          language,
                          count,
                      }
                    : prev;
            },
            {
                language: '',
                count: 0,
            }
        );
        const organization: any = await (
            await fetch('https://api.github.com/orgs/P-YNPM', {
                method: 'GET',
                headers: {
                    Authorization: `token ${portfolioInfo.apiKey}`,
                },
            })
        ).json();
        const { login, description, html_url } = organization;
        return {
            name: parseAsString(login).orElseThrowError('login'),
            language,
            description:
                parseAsString(description).orElseThrowError('description'),
            url: parseAsString(html_url).orElseThrowError('html_url'),
        };
    }
    throw new Error(
        'Response returned from Github Organization API is not array type'
    );
};

const githubUser = await fetchGithubUser();
const githubOrganization = await fetchGithubOrganization();

export const fetchRepositories = (): ReadonlyArray<PortfolioData> =>
    githubUser.concat(githubOrganization);

export const portfolioLanguagesList = (
    portfolioData: ReadonlyArray<PortfolioData>
): ReadonlyArray<string> =>
    Array.from(new Set(portfolioData.map((data) => data.language)))
        .concat('All')
        .sort((a, b) => a.localeCompare(b));

export const queryPortfolioFromLanguage = (
    portfolioData: ReadonlyArray<PortfolioData>,
    selectedLanguage: string
): ReadonlyArray<PortfolioData> =>
    selectedLanguage === 'All'
        ? portfolioData
        : portfolioData.filter(({ language }) => language === selectedLanguage);

export const parsePageQuery = (
    page: string,
    numberOfPortfolioPerPage: number
): number => {
    const parsedPage = Number.parseInt(page, 10);
    if (parsedPage >= 0) {
        return parsedPage * numberOfPortfolioPerPage;
    }
    return 0;
};

export const findLanguageQueried = (
    portfolioData: ReadonlyArray<PortfolioData>,
    language: string
): string | 'All' => {
    const finalizedLang =
        language === 'CPP' ? 'C++' : language === 'C' ? 'C#' : language;

    return (
        portfolioData.find((data) => data.language === finalizedLang)
            ?.language ?? 'All'
    );
};

export const queryPortfolioForPaging = (
    portfolioData: ReadonlyArray<PortfolioData>,
    pageNumber: number
): ReadonlyArray<PortfolioData> =>
    portfolioData.flatMap((_, index) => {
        const data = portfolioData[index + pageNumber];
        return index < 9 ? (data ? [data] : []) : [];
    });
