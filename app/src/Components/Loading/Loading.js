import React from "react";
import styled, { keyframes } from "styled-components";

const circleAnimation = keyframes`
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
`;

const shadowAnimation = keyframes`
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
`;

const LoadContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    boz-sizing: border-box;
    position: fixed;
    left: 0;
    background: rgba(0,0,0,0.4);
    top: 0;
    z-index: 9999;
    flex-direction: column;

`;

const Wrapper = styled.div`
    width: 200px;
    height: 60px;
    transform: translate(-50%, -50%);
    position: fixed;
    top: 50%;
    left: 50%;
`;


const Circle = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    // background-color: #fff;
    left: ${({ index }) => (index === 1 ? '15%' : index === 2 ? '45%' : 'auto')};
    right: ${({ index }) => (index === 3 ? '15%' : 'auto')};
    transform-origin: 50%;
    animation: ${circleAnimation} .4s alternate infinite ease;
    animation-delay: ${({ index }) => (index === 2 ? '.2s' : index === 3 ? '.3s' : '0s')};

    display: flex;
    overflow: hidden;


    background-color: ${({ index }) => (index === 2 ? 'red' : index === 3 ? 'black' : 'white')};
    border: 1px solid white;
    
`;

const Shadow = styled.div`
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: ${({ index }) => (index === 1 ? '15%' : index === 2 ? '45%' : 'auto')};
    right: ${({ index }) => (index === 3 ? '15%' : 'auto')};
    filter: blur(1px);
    animation: ${shadowAnimation} .5s alternate infinite ease;
    animation-delay: ${({ index }) => (index === 2 ? '.2s' : index === 3 ? '.3s' : '0s')};
`;

const Text = styled.span`
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Lato';
    font-size: 20px;
    letter-spacing: 6px;
    color: #fff;
`;

export default function Loading({ status }) {

    if (!status)
        return null;

    return (
        <LoadContainer>
            <Wrapper>
                {[1, 2, 3].map(index => (
                    <Circle key={`circle-${index}`} index={index} >
                        {index === 1 && <img alt="dado branco blaze"  src="./14x-icon.png"/>}
                    </Circle>
                ))}
                {[1, 2, 3].map(index => (
                    <Shadow key={`shadow-${index}`} index={index} />
                ))}
            </Wrapper>
            <Text>Carregando</Text>

        </LoadContainer>

    );
}
