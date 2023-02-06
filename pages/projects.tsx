import React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../src/web/theme/global-theme';
import Seo from '../src/web/components/seo';
import Image from 'next/image';
import projects from '../src/web/data/projects';
import useWordScramble from '../src/web/hook/word-scramble';

type ProjectImageBackgroundProps = Readonly<{
    backgroundImage: string;
}>;

const Project = () => (
    <GlobalContainer>
        <Seo
            title="Projects"
            keywords={['Project', 'Software Engineer']}
            content="Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
        />
        <ProjectContainer>
            {projects.map(({ name, description, url }) => {
                const path = 'images/projects';

                const wordScrambleState = useWordScramble({
                    count: 10,
                    timeOut: 10,
                    content: description,
                });

                return (
                    <ProjectItemContainer
                        key={name}
                        onMouseOver={wordScrambleState.start}
                        onMouseOut={wordScrambleState.stop}
                    >
                        <ProjectItemBackground
                            backgroundImage={`${path}/background/${name}.webp`}
                        />
                        <ImageTextContainer>
                            <ProjectLogoContainer>
                                <a
                                    href={url}
                                    target="blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        width={90}
                                        alt={`${name}.webp`}
                                        src={require(`../public/${path}/logo/${name}.webp`)}
                                    />
                                </a>
                            </ProjectLogoContainer>
                            <Caption>{wordScrambleState.word()}</Caption>
                        </ImageTextContainer>
                    </ProjectItemContainer>
                );
            })}
        </ProjectContainer>
    </GlobalContainer>
);

const ProjectContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    @media (max-width: 1100px) {
        grid-template-columns: auto auto auto;
    }
    @media (max-width: 877px) {
        grid-template-columns: auto auto;
    }
    @media (max-width: 530px) {
        grid-template-columns: auto;
    }
`;

const ProjectItemBackground = styled.div`
    height: 40vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${({
        backgroundImage,
    }: ProjectImageBackgroundProps) => backgroundImage});
    @media (max-width: 877px) {
        height: 250px;
    }
`;

const ProjectItemContainer = styled.div`
    position: relative;
    justify-content: center;
    align-items: center;
    &:hover ${ProjectItemBackground} {
        transition: all 1s ease;
        filter: brightness(20%);
    }
    @media (max-width: 877px) {
        width: 100%;
    }
`;

const Caption = styled.div`
    transition: 1s;
    font-size: 0.9em;
    font-weight: 600;
    color: transparent;
    padding: 0 8px;
    box-sizing: border-box;
    word-break: break-word;
    @media (max-width: 877px) {
        width: 50vw;
    }
    @media (max-width: 586px) {
        font-size: 0.7em;
    }
`;

const ImageTextContainer = styled.div`
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    text-align: center;
    height: 100%;
    width: 100%;
    &:hover ${Caption} {
        color: ${({ theme }) => theme.green};
    }
`;

const ProjectLogoContainer = styled.div`
    padding: 0 0 8px 0;
    box-sizing: border-box;
`;

export default Project;
