const isBlank = (s: string) =>
    s.split('').filter((c) => ' ' === c).length === s.length;

const isEmpty = (s: string) => !s;

const parseProcessEnv = <EnvironmentVariable extends string>({
    name,
    value,
}: Readonly<{
    name: string;
    value: undefined | EnvironmentVariable;
}>) => {
    if (value) {
        return value;
    }
    throw new Error(`Environment variable of "${name}" is undefined`);
};

export { isBlank, isEmpty, parseProcessEnv };
