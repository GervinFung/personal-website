import React from 'react';
import type { NextPage } from 'next';
import Intro from '../src/web/components/intro';
import Seo from '../src/web/components/seo';
import { BlurryClusterHoverEffect } from '../src/web/components/common/hover-effect';

const Index: NextPage = () => (
    <BlurryClusterHoverEffect>
        <Seo
            title="Home"
            keywords={['Personal Website']}
            description="I am Gervin Fung Da Xuen. Everything you want to know about me as a software engineer, can be found here. Feel free to poke around. Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
        />
        <Intro />
    </BlurryClusterHoverEffect>
);

export default Index;
