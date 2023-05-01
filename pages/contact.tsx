import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Contact: NextPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/?part=contact');
    }, []);

    return null;
};

export default Contact;
