import React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../src/web/theme/GlobalTheme';
import { NextPage } from 'next';
import Seo from '../src/web/components/seo';

const About: NextPage = () => (
    <ContentContainer>
        <Seo
            title="About"
            keywords={['About', 'Java', 'TypeScript']}
            content="A really short summary of me. You can know the primary programming language that I am using, what I am learning and what I am currently working on"
        />
        <Container>
            <TwoRowsContainer>
                <ProfileImageContainer>
                    <ProfileImage />
                </ProfileImageContainer>
                <div>
                    <ProfileContentContainerHeaderOne>
                        Bonjour! Je vous remercie de votre visite!
                    </ProfileContentContainerHeaderOne>
                    <ProfileContentContainerParagraph>
                        See that guy? It is me! I am Gervin Fung Da Xuen and I
                        am not a French
                    </ProfileContentContainerParagraph>
                    <ProfileContentContainerParagraph>
                        I am an undergraduate studying Software Engineering.
                        TypeScript and Java is my primary language in
                        programming. I am learning full stack development and
                        compiler. Currently, I am working on development tools
                    </ProfileContentContainerParagraph>
                    <ProfileContentContainerParagraph>
                        The Projects in Portfolio Page are what I have
                        programmed during my free time. I hope you enjoyed and
                        thank you for checking it out!
                    </ProfileContentContainerParagraph>
                </div>
            </TwoRowsContainer>
        </Container>
    </ContentContainer>
);

const ContentContainer = styled(GlobalContainer)``;

const Container = styled.div`
    display: flex;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
`;

const TwoRowsContainer = styled.div`
    width: 90%;
    height: 100%;
    display: block;
`;

const ProfileImageContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    @media (max-width: 877px) {
        flex-direction: column;
        width: 100%;
    }
`;

const ProfileImage = styled.img.attrs({
    src: 'asset/images/others/about.webp',
    alt: 'profile',
})`
    border-radius: 50%;
    width: 25%;
    height: auto;
    @media (max-width: 877px) {
        width: 50%;
    }
`;

const ProfileContentContainerHeaderOne = styled.h1`
    text-align: center;
    font-size: 2.5em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    letter-spacing: 5.5px;
    text-shadow: 4px 2px ${({ theme }) => theme.greenColor},
        -4px 2px ${({ theme }) => theme.redColor};
    @media (max-width: 586px) {
        font-size: 1.5em;
    }
`;

const ProfileContentContainerParagraph = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.theme.mediumEmphasesTextColor};
    font-size: 1.3em;
    @media (max-width: 586px) {
        font-size: 1em;
    }
`;

export default About;