import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useBlaze } from '../../context/BlazeContext';

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

const Grafico1Dash = () => {
    const { historico, current } = useBlaze();
    const [displayRedCount, setDisplayRedCount] = useState(0);
    const [displayWhiteCount, setDisplayWhiteCount] = useState(0);
    const [displayBlackCount, setDisplayBlackCount] = useState(0);
    const [totalGains, setTotalGains] = useState(0);
    const [Hist, setHist] = useState([])

    useEffect(() => {
        if (setHist.length === 0 && historico.length > 0) {
            setHist(historico)
            const lastId = Hist[0].id;

            axios.get(`http://54.94.159.102:3000/obterApostas/${lastId}`)
                .then(response => {
                    const data = response.data;

                    // Função para atualizar suavemente os valores
                    updateValues(
                        displayRedCount, 
                        parseFloat(data.totalBetRed), 
                        setDisplayRedCount
                    );
                    updateValues(
                        displayWhiteCount, 
                        parseFloat(data.totalBetWhite), 
                        setDisplayWhiteCount
                    );
                    updateValues(
                        displayBlackCount, 
                        parseFloat(data.totalBetBlack), 
                        setDisplayBlackCount
                    );
                    setTotalGains(parseFloat(data.totalGain));
                })
                .catch(error => {
                    console.error("Erro ao buscar dados das apostas:", error);
                });
        }
    }, [historico]);

    const updateValues = (currentValue, targetValue, setValue) => {
        const steps = 50; // Número total de incrementos
        const increment = (targetValue - currentValue) / steps;
        let value = currentValue;

        const interval = setInterval(() => {
            value += increment;
            setValue(Math.max(0, value)); // Não permitir valores negativos

            if ((increment > 0 && value >= targetValue) || (increment < 0 && value <= targetValue)) {
                clearInterval(interval);
                setValue(targetValue.toFixed(2)); // Garante ajuste final
            }
        }, 20); // Intervalo de atualização
    };

    const total = displayRedCount + displayWhiteCount + displayBlackCount;
    const percentageRed = total > 0 ? (displayRedCount / total) * 100 : 0;
    const percentageWhite = total > 0 ? (displayWhiteCount / total) * 100 : 0;
    const percentageBlack = total > 0 ? (displayBlackCount / total) * 100 : 0;

    return (
      <>
      
      </>
        // <GraficoContainer
        //     percentage1={percentageRed}
        //     percentage2={percentageWhite}
        //     percentage3={percentageBlack}
        //     color1="rgba(200, 0, 0, 1)"
        //     color2="rgba(240, 240, 240, 0.8)"
        //     color3="rgba(10, 10, 10, 1)"
        // >
        //     <InnerCircle />
        // </GraficoContainer>
    );
};

export default Grafico1Dash;
