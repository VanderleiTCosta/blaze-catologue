import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBlaze } from '../../context/BlazeContext';
import helpers from '../helpers';

const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    position: relative;
`;

const DonutChart = styled.svg`
    width: 100%;
    height: 100%;
`;

const Circle = styled.circle`
    transition: stroke-dasharray 0.5s ease;
    &:hover {
        opacity: 0.7; // Muda a opacidade ao passar o mouse
    }
`;

const BarrasVerticais = () => {
    const { historico } = useBlaze();
    const [data, setData] = useState({ red: 0, white: 0, black: 0 });

    useEffect(() => {
        if (historico && historico.length > 0) {
            const newData = helpers.porcentagemTodosOsTempos(historico);
            setData({
                red: newData.red || 0,
                white: newData.white || 0,
                black: newData.black || 0
            });
        }
    }, [historico]);

    const total = data.red + data.white + data.black;
    const adjustedTotal = total === 0 ? 1 : total; // Previne divisão por zero, mas mantém o total

    // Ajusta o cálculo das porcentagens
    const redPercentage = (data.red / adjustedTotal) * 100;
    const whitePercentage = (data.white / adjustedTotal) * 100;
    const blackPercentage = (data.black / adjustedTotal) * 100;

    // Para garantir que a soma sempre seja 100%, normalizamos
    const totalPercentage = redPercentage + whitePercentage + blackPercentage;
    const correctedRedPercentage = (redPercentage / totalPercentage) * 100;
    const correctedWhitePercentage = (whitePercentage / totalPercentage) * 100;
    const correctedBlackPercentage = (blackPercentage / totalPercentage) * 100;

    const radius = 80; // Raio do círculo
    const strokeWidth = 40; // Largura da borda
    const circumference = 2 * Math.PI * radius;

    // Cálculo dos offsets
    const whiteOffset = (correctedRedPercentage / 100) * circumference;
    const blackOffset = whiteOffset + (correctedWhitePercentage / 100) * circumference;

    const getStrokeDasharray = (percentage) => {
        return `${(percentage / 100) * circumference} ${circumference}`;
    };

    return (
        <ChartContainer>
            <DonutChart viewBox="0 0 200 200">
                <Circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(200, 0, 0, 1)" // Vermelho
                    strokeWidth={strokeWidth}
                    strokeDasharray={getStrokeDasharray(correctedRedPercentage)}
                    strokeDashoffset={0}
                />
                <Circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(240, 240, 240, 1)" // Branco
                    strokeWidth={strokeWidth}
                    strokeDasharray={getStrokeDasharray(correctedWhitePercentage)}
                    strokeDashoffset={whiteOffset}
                />
                <Circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(10, 10, 10, 1)" // Preto
                    strokeWidth={strokeWidth}
                    strokeDasharray={getStrokeDasharray(correctedBlackPercentage)}
                    strokeDashoffset={blackOffset}
                />
                <circle cx="100" cy="100" r="30" fill="black" /> {/* Círculo central para criar o efeito donut */}
            </DonutChart>
        </ChartContainer>
    );
};

export default BarrasVerticais;