import { parseAsString } from 'parse-dont-validate';

declare global {
    interface String {
        isEmpty: () => boolean;
        isBlank: () => boolean;
        hasSufficientLength: (length: number) => boolean;
    }
}

String.prototype.isBlank = function () {
    return this.split('').filter((char) => ' ' === char).length === this.length;
};

String.prototype.isEmpty = function () {
    return this === '';
};

String.prototype.hasSufficientLength = function (length: number) {
    return (
        this.split('').filter((char) => !(char.isBlank() || char.isEmpty()))
            .length >= length
    );
};

const validateEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

type EmptyString = '';

export type Name = {
    readonly value: string;
    readonly error:
        | `*Please do not leave name section ${'empty' | 'blank'}*`
        | EmptyString;
};

export type Email = {
    readonly value: string;
    readonly error:
        | `*Please do not leave email section ${'empty' | 'blank'}*`
        | '*Please enter valid email format*'
        | EmptyString;
};

export type Message = {
    readonly value: string;
    readonly error:
        | `*Please do not leave message section ${'empty' | 'blank'}*`
        | '*At least 10 words are required*'
        | EmptyString;
};

export type Data =
    | {
          readonly type: 'succeed' | 'input';
          readonly message: Message;
          readonly name: Name;
          readonly email: Email;
      }
    | {
          readonly type: 'failed';
          readonly error: string;
      };

export const parseAsData = (data: any): Data => {
    if (data) {
        const { type } = data;
        const parsedType = parseAsString(type).orElseThrowError('type');
        switch (parsedType) {
            case 'input':
            case 'succeed': {
                const { message, email, name } = data;
                return {
                    type: parsedType,
                    message: parseAsMessage(message),
                    email: parseAsEmail(email),
                    name: parseAsName(name),
                };
            }
            case 'failure': {
                const { error } = data;
                return {
                    type: 'failed',
                    error: parseAsString(error).orElseThrowError('error'),
                };
            }
        }
        throw new Error(
            `type is not of type in Data, it is ${JSON.stringify(
                type,
                null,
                2
            )}`
        );
    }
    throw new Error(`data is falsy, it is ${JSON.stringify(data, null, 2)}`);
};

const parseAsInfo = (info: any) => {
    if (info) {
        const { value, error } = info;
        return {
            value: parseAsString(value).orElseThrowError('value'),
            error: parseAsString(error).orElseThrowError('error'),
        };
    }
    throw new Error(`info is falsy, it is ${JSON.stringify(info, null, 2)}`);
};

const parseAsName = (name: any): Name => {
    const { value, error } = parseAsInfo(name);
    switch (error) {
        case '':
        case '*Please do not leave name section empty*':
        case '*Please do not leave name section blank*':
            return {
                value,
                error,
            };
    }
    throw new Error(
        `name is not of type Name, it is ${JSON.stringify(name, null, 2)}`
    );
};

const parseAsEmail = (email: any): Email => {
    const { value, error } = parseAsInfo(email);
    switch (error) {
        case '':
        case '*Please do not leave email section empty*':
        case '*Please do not leave email section blank*':
        case '*Please enter valid email format*':
            return {
                value,
                error,
            };
    }
    throw new Error(
        `email is not of type Email, it is ${JSON.stringify(email, null, 2)}`
    );
};

const parseAsMessage = (message: any): Message => {
    const { value, error } = parseAsInfo(message);
    switch (error) {
        case '':
        case '*Please do not leave message section empty*':
        case '*Please do not leave message section blank*':
        case '*At least 10 words are required*':
            return {
                value,
                error,
            };
    }
    throw new Error(
        `email is not of type Email, it is ${JSON.stringify(message, null, 2)}`
    );
};

export const getName = (value: string): Name => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave name section empty*'
        : value.isBlank()
        ? '*Please do not leave name section blank*'
        : '',
});

export const getEmail = (value: string): Email => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave email section empty*'
        : value.isBlank()
        ? '*Please do not leave email section blank*'
        : validateEmail(value)
        ? ''
        : '*Please enter valid email format*',
});

export const getMessage = (value: string): Message => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave message section empty*'
        : value.isBlank()
        ? '*Please do not leave message section blank*'
        : value.hasSufficientLength(10)
        ? ''
        : '*At least 10 words are required*',
});

export const allValueValid = (
    { value: name, error: nameErr }: Name,
    { value: email, error: emailErr }: Email,
    { value: message, error: messageErr }: Message
): boolean => {
    const noError =
        nameErr.isEmpty() && emailErr.isEmpty() && messageErr.isEmpty();
    const nameInvalid = name.isBlank() || name.isEmpty();
    const messageInvalid =
        message.isBlank() ||
        message.isEmpty() ||
        !message.hasSufficientLength(10);
    const inputValid = messageInvalid && validateEmail(email) && !nameInvalid;
    return noError && !inputValid;
};
