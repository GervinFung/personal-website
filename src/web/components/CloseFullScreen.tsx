import React from 'react';
import styled from 'styled-components';

type CloseButtonProps = Readonly<{
    color?: string;
}>;

const CloseFullScreen = ({
    close,
    color,
}: CloseButtonProps &
    Readonly<{
        close: () => void;
    }>) => (
    <CloseButton color={color} onClick={() => close()}>
        &times;
    </CloseButton>
);

const CloseButton = styled.span`
    color: ${({ color }: CloseButtonProps) =>
        color === undefined
            ? ({ theme }) => theme.theme.highEmphasesTextColor
            : color};
    margin: 10px 20px 10px 20px;
    font-size: 2em;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    transition: all ease 0.2s;
    &:hover,
    &:focus {
        transform: scale(2);
        text-decoration: none;
        cursor: pointer;
    }
`;

export default CloseFullScreen;
