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
    height: 100px; 
    overflow: hidden; 
    display: flex; 
    align-items: center; 
`;

const Ball = styled.div`
    width: 45px; 
    height: 45px;
    border-radius: 6px; 
    position: absolute; 
    animation: ${moveRight} 2s linear infinite; 
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
        background-color: white; 
        left: 0; 
        animation-delay: 0.9s; 
    }

    &:nth-child(2) {
        background-color: red; 
        left: calc(40px + 45px);
        animation-delay: 0.9s; 
    }

    &:nth-child(3) {
        background-color: black; 
        left: calc(80px + 90px); 
        animation-delay: 0.9s; 
    }

    img{
        width: 100%;
        height: 100%;
    }

    span{
        border-radius: 50%;
        border: 3px solid white;
        width: 30px;
        height: 40px;
    }
`;

const TremTitle = styled.div`
    position: absolute;
    top: 0px;
    left: 50%;
    right: 50%;
    height: 30px;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
`;

const Trem = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%;
    right: 50%;
    height: 60%;
    transform: translateX(-50%);
    width: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    color: transparent;
    z-index: 9;
`;

const MovendoBolinhasBlaze = () => {
    return (
        <>
            <TremTitle>
                GIRANDO
            </TremTitle>
            <Trem>
                s
            </Trem>
            <BulbContainer>

                <Ball>
                    <img src="./14x-icon.png" />
                </Ball>
                <Ball >
                    {/* <span></span> */}
                </Ball>
                <Ball >
                    {/* <span></span> */}
                </Ball>
            </BulbContainer>
        </>

    );
};

export default MovendoBolinhasBlaze;
