import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useJon } from '../../context/JonContext';
import helpers from "../helpers";

const ContainerContent = styled.div`
    width: 100%;
    height: max-content;
`;

const Content = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

const MarketStatus = styled.div`
    color: ${props => (props.isOpen ? 'rgba(100, 255, 0, 1)' : 'red')};
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BarContainer = styled.div`
    width: 100%;
    height: 70px;
    background-color: #333;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;
`;

const BarSegment = styled.div`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.4s ease-in-out;
`;

const RedBar = styled(BarSegment)`
    background-color: green;
    width: ${props => props.percent}%;
`;

const WhiteBar = styled(BarSegment)`
    background-color: rgba(240, 240, 240, 1);
    width: ${props => props.percent}%;
    left: ${props => props.offset}%;
`;

const BlackBar = styled(BarSegment)`
    background-color: rgba(50, 50, 50, 1);
    width: ${props => props.percent}%;
    left: ${props => props.offset}%;
`;

const BettingInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
    width: 100%;
    gap: 10px;

    .icone-tipo {
        display: flex;
        text-align: start;
        width: 100%;
        align-items: center;
        justify-content: start;
        box-sizing: border-box;

        p {
            padding-left: 10px;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .valorReal {
            font-weight: 500;
            margin-left: 10px;
            font-size: 16px;
            width: 100px;
        }
    }

    .box {
        width: 30px;
        height: 30px;
        border-radius: 3px;
        border: 1px solid white;
    }

    .red {
        background: green;
    }

    .white {
        background: rgba(240, 240, 240, 1);
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .black {
        background: rgba(50, 50, 50, 1);
    }
`;

const BettingComponent = ({ isOpen }) => {
    const { historico, current, bets } = useJon();
    const [currentRedCount, setCurrentRedCount] = useState(0);
    const [currentWhiteCount, setCurrentWhiteCount] = useState(0);
    const [currentBlackCount, setCurrentBlackCount] = useState(0);
    const [displayRedCount, setDisplayRedCount] = useState(0);
    const [displayWhiteCount, setDisplayWhiteCount] = useState(0);
    const [displayBlackCount, setDisplayBlackCount] = useState(0);
    const [totalGains, setTotalGains] = useState(0);
    const updating = useRef(false); // Ref to track if an update is in progress

    console.log(helpers.historico)

    useEffect(() => {
        if (bets && !updating.current) {
            // Aguarda até que uma atualização anterior tenha terminado
            updating.current = true;
            handleUpdateSequence(bets.totalBetRed, setDisplayRedCount, currentRedCount, setCurrentRedCount);
            handleUpdateSequence(bets.totalBetWhite, setDisplayWhiteCount, currentWhiteCount, setCurrentWhiteCount);
            handleUpdateSequence(bets.totalBetBlack, setDisplayBlackCount, currentBlackCount, setCurrentBlackCount);
            handleUpdateSequence(bets.totalGain, setTotalGains, totalGains, setTotalGains);
        }
    }, [bets]);

    const handleUpdateSequence = (endValue, setDisplay, currentValue, setCurrent) => {
        setValueIncrement(currentValue, endValue, setDisplay, () => {
            setCurrent(endValue); // Atualiza o estado atual depois de completo
            updating.current = false; // Libera para novas atualizações
        });
    };

    const setValueIncrement = (startValue, endValue, setValue, callback) => {
        const stepTime = 100;
        const steps = 100;
        const increment = (endValue - startValue) / steps;

        let step = 0;

        const interval = setInterval(() => {
            step++;
            if (step <= steps) {
                setValue(prev => prev + increment);
            } else {
                clearInterval(interval);
                setValue(endValue);
                callback();
            }
        }, stepTime);
    };

    function formatToBRL(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    const total = displayRedCount + displayWhiteCount + displayBlackCount;
    const redPercent = total > 0 ? (displayRedCount / total) * 100 : 0;
    const whitePercent = total > 0 ? (displayWhiteCount / total) * 100 : 0;
    const blackPercent = total > 0 ? (displayBlackCount / total) * 100 : 0;

    const blackRedTotal = displayBlackCount + displayRedCount;
    const redPercentBR = blackRedTotal > 0 ? (displayRedCount / blackRedTotal) * 100 : 0;
    const blackPercentBR = blackRedTotal > 0 ? (displayBlackCount / blackRedTotal) * 100 : 0;

    return (
        <ContainerContent>
            <Content>
                <MarketStatus isOpen={current && current.status === "waiting"}>
                    {current && current.status != null && current.status != "complete" && current.status != "rolling" ? "MERCADO ABERTO" : "MERCADO FECHADO"}
                </MarketStatus>
                <BarContainer>
                    <RedBar percent={redPercent} />
                    <WhiteBar percent={whitePercent} offset={redPercent} />
                    <BlackBar percent={blackPercent} offset={redPercent + whitePercent} />
                </BarContainer>
                <BarContainer>
                    <RedBar percent={redPercentBR} />
                    <BlackBar percent={blackPercentBR} offset={redPercentBR} />
                </BarContainer>
                <BettingInfo>
                    <div className='icone-tipo'>
                        <div className='box white'><img alt='box white' src='14x-icon.png' /></div>
                        <p>Branco:</p> <span className='valorReal'>{formatToBRL(Math.round(displayWhiteCount))}</span>
                    </div>
                    <div className='icone-tipo'>
                        <div className='box red'></div>
                        <p>Verde:</p> <span className='valorReal'>{formatToBRL(Math.round(displayRedCount))}</span>
                    </div>
                    <div className='icone-tipo'>
                        <div className='box black'></div>
                        <p>Preto:</p> <span className='valorReal'>{formatToBRL(Math.round(displayBlackCount))}</span>
                    </div>
                    <div className='icone-tipo'>
                        <div className='box'></div>
                        <p>Ganhos Totais:</p> <span className='valorReal'>{formatToBRL(totalGains)}</span>
                    </div>
                </BettingInfo>
            </Content>
        </ContainerContent>
    );
};

export default BettingComponent;