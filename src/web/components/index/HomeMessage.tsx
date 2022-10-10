import React from 'react';
import styled from 'styled-components';

const HomeMessage = () => {
    const [state, setState] = React.useState({
        time: Date.now(),
    });

    const { time } = state;

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setState((prev) => ({
                ...prev,
                time: Date.now(),
            }));
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);

    const isDay = () => {
        const hours = new Date(time).getHours();
        return hours >= 6 && hours < 18;
    };

    return (
        <IndexMessage>
            <IndexMessageParagraph>
                {isDay() ? 'Bonjour' : 'Bonsoir'}
            </IndexMessageParagraph>
            <IndexMessageParagraph>I am</IndexMessageParagraph>
            <IndexNameParagraph>Gervin</IndexNameParagraph>
        </IndexMessage>
    );
};

const IndexMessage = styled.div`
    @media (max-width: 962px) {
        margin-bottom: 30px;
    }
`;

const IndexMessageParagraph = styled.p`
    text-align: left;
    font-size: 5em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    margin: 2vw;
    @media (max-width: 994px) {
        font-size: 4em;
        text-align: center;
    }
    @media (max-width: 586px) {
        font-size: 3em;
    }
    @media (max-width: 286px) {
        font-size: 2em;
    }
`;

const IndexNameParagraph = styled(IndexMessageParagraph)`
    text-transform: uppercase;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    letter-spacing: 5.5px;
    text-shadow: 4px 1px ${({ theme }) => theme.greenColor},
        -4px 1px ${({ theme }) => theme.redColor};
`;

export default HomeMessage;
