import axios from 'axios';
import type { Data } from '../../common/contact';

const sendMessage = (
    values: Readonly<{
        name: string;
        email: string;
        message: string;
        isHoneyPot?: true;
    }>
) =>
    axios
        .post(`${process.env.ORIGIN}/api/contact`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(({ data }) => data as Data)
        .catch(() => {
            throw new Error(
                `Oops! I can't send your email as there is an issue`
            );
        });

export { sendMessage };
