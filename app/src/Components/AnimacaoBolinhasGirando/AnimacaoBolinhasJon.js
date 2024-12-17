import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animação para mover as bolinhas da esquerda para a direita
const moveRight = keyframes`
    0% {
        transform: translateX(-40vw);
    }
    100% {
        transform: translateX(40vw);
    }
`;

const BulbContainer = styled.div`
    position: relative;
    width: 100%;
    height: 70px; 
    overflow: hidden; 
    display: flex; 
    align-items: center; 
`;

const Ball = styled.div`
    width: 60px; 
    height: 60px;
    // border-radius: 50%; 
    position: absolute; 
    animation: ${moveRight} 1.3s linear infinite; 

    &:nth-child(1) {
        background-color: white; 
        left: 0; 
        animation-delay: 0.9s; 
    }

    &:nth-child(2) {
        background-color: green; 
        left: calc(40px + 45px);
        animation-delay: 0.9s; 
    }

    &:nth-child(3) {
        background-color: black; 
        left: calc(80px + 90px); 
        animation-delay: 0.9s; 
    }
`;

const TremTitle = styled.div`
    position: absolute;
    top: 0px;
    left: 50%;
    right: 50%;
    height: 100%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
`;

const Trem = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%;
    right: 50%;
    height: 80%;
    transform: translateX(-50%);
    width: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    color: transparent;
    z-index: 9;
`;

const MovendoBolinhasJon = () => {
    return (
        <>
            <TremTitle>
                GIRANDO
            </TremTitle>
            <Trem>
                s
            </Trem>
            <BulbContainer>

                <Ball />
                <Ball />
                <Ball />
            </BulbContainer>
        </>

    );
};

export default MovendoBolinhasJon;
