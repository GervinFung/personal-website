import axios from 'axios';
import type { Data } from '../../common/contact';
import { parseProcessEnv } from '../../common/string';

const sendMessage = (
    values: Readonly<{
        name: string;
        email: string;
        message: string;
        isHoneyPot?: true;
    }>
) =>
    axios
        .post(
            `${parseProcessEnv({
                name: 'ORIGIN',
                value: process.env.ORIGIN,
            })}/api/contact`,
            values,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(({ data }) => data as Data)
        .catch(() => {
            throw new Error(
                `Oops! I can't send your email as there is an issue`
            );
        });

export { sendMessage };
