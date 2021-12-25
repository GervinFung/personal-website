import { parseAsNumber, parseAsString } from 'parse-dont-validate';

export type Data = {
    readonly numberOfPagesQueried: number;
    readonly portfolioLanguages: ReadonlyArray<string>;
    readonly portfolioPaginated: ReadonlyArray<{
        readonly name: string;
        readonly description: string;
        readonly language: string;
        readonly url: string;
    }>;
    readonly selectedLanguage: string;
};

const parseAsReadonlyArray = <T>(
    variableValue: unknown,
    callBackFunction: (val: any) => T
) => {
    return {
        orElse: <U>(u: U) =>
            Array.isArray(variableValue)
                ? (variableValue.map(callBackFunction) as ReadonlyArray<T>)
                : u,
        orElseThrowError: (variableName: string) => {
            if (Array.isArray(variableValue)) {
                return variableValue.map(callBackFunction) as ReadonlyArray<T>;
            }
            throw new Error(
                `${variableName} expect to be an array, instead it is ${JSON.stringify(
                    variableValue,
                    null,
                    2
                )}`
            );
        },
    };
};

export const parseAsPortfolioData = (data: any): Data => {
    const numberOfPagesQueried = parseAsNumber(
        data.numberOfPagesQueried
    ).orElseThrowError('numberOfPagesQueried');
    const selectedLanguage = parseAsString(
        data.selectedLanguage
    ).orElseThrowError('selectedLanguage');
    const portfolioPaginated = parseAsReadonlyArray(
        data.portfolioPaginated,
        (
            val
        ): {
            readonly name: string;
            readonly description: string;
            readonly language: string;
            readonly url: string;
        } => {
            const name = parseAsString(val.name).orElseThrowError('name');
            const description = parseAsString(val.description).orElseThrowError(
                'description'
            );
            const language = parseAsString(val.language).orElseThrowError(
                'language'
            );
            const url = parseAsString(val.url).orElseThrowError('url');
            return {
                name,
                description,
                language,
                url,
            } as const;
        }
    ).orElseThrowError('portfolioPaginated');
    const portfolioLanguages = parseAsReadonlyArray(
        data.portfolioLanguages,
        (val): string =>
            parseAsString(val).orElseThrowError('portfolioLanguage')
    ).orElseThrowError('portfolioLanguages');
    return {
        numberOfPagesQueried,
        portfolioLanguages,
        portfolioPaginated,
        selectedLanguage,
    };
};
