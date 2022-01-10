export declare type PortfolioData = Readonly<{
    name: string;
    description: string;
    language: string;
    url: string;
}>;
export declare type Data = Readonly<{
    numberOfPagesQueried: number;
    portfolioLanguages: ReadonlyArray<string>;
    portfolioPaginated: ReadonlyArray<PortfolioData>;
    selectedLanguage: string;
}>;
//# sourceMappingURL=portfolio.d.ts.map