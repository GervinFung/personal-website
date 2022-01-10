export type PortfolioData = Readonly<{
    name: string;
    description: string;
    language: string;
    url: string;
}>;

export type Data = Readonly<{
    numberOfPagesQueried: number;
    portfolioLanguages: ReadonlyArray<string>;
    portfolioPaginated: ReadonlyArray<PortfolioData>;
    selectedLanguage: string;
}>;
