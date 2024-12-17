import React from 'react';
import styled from 'styled-components';

const GraficoContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  background: conic-gradient(
    ${props => props.color1} 0% ${props => props.percentage1}%,
    ${props => props.color2} ${props => props.percentage1}% ${props => props.percentage1 + props.percentage2}%,
    ${props => props.color3} ${props => props.percentage1 + props.percentage2}% 100%
  );
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
`;

const InnerCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgba(20, 20, 20, 1); 
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
`;

const Grafico1Dash2 = ({ redCount, whiteCount, blackCount }) => {
  const total = redCount + whiteCount + blackCount;
  const percentage1 = (redCount / total) * 100;
  const percentage2 = (whiteCount / total) * 100;
  const percentage3 = (blackCount / total) * 100;

  return (
    <GraficoContainer
      percentage1={percentage1}
      percentage2={percentage2}
      percentage3={percentage3}
      color1="rgba(0, 180, 0, 1)"
      color2="rgba(230, 230, 230, 0.8)"
      color3="rgba(10, 10, 10, 1)"
    >
      <InnerCircle />
    </GraficoContainer>
  );
};

export default Grafico1Dash2;
