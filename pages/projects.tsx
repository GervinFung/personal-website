import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Projects: NextPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/?part=projects');
    }, []);

    return null;
};

export default Projects;
