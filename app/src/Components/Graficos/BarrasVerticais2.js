import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useBlaze } from '../../context/BlazeContext';
import helpers from '../helpers';

const BarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 100%; 
    margin-bottom: 20px;
    box-shadow: 4px 4px 2px rgba(0,0,0,1);
    // background: rgba(10, 10, 10, 1);
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
    box-sizing: border-box;
    padding: 0 10px;
    transition: .3s;
    gap: 5px;

    &:hover{
        background: rgba(10, 10, 10, 0.6);
    }
`;

const Bar = styled.div`
    width: 100%;
    transition: height 0.4s ease-in-out;
    transition: .3s;
`;

const RedBar = styled(Bar)`
    background-color: rgba(0, 130, 0, 1);
    border: 2px solid white;
    border-bottom: 0;

    &:hover{
        background: rgba(0, 80, 0, 1);
    }
`;

const WhiteBar = styled(Bar)`
    background-color: rgba(240, 240, 240, 1);
    border: 2px solid white;
    border-bottom: 0;
    &:hover{
        background: rgba(190, 190, 190, 1);
    }
`;

const BlackBar = styled(Bar)`
    background-color: rgba(50, 50, 50, 1);
    border: 2px solid white;
    border-bottom: 0;

    &:hover{
        background: rgba(120, 120, 120, 1);
    }
`;

const BarrasVerticais = () => {
    const { historico } = useBlaze();
    const updating = useRef(false);

    useEffect(() => {
        if (historico && historico.length > 0) {
            const newData = helpers.porcentagemTodosOsTempos(historico);
            if (!updating.current) {
                updating.current = true; // Marca como atualizando
                updateBarHeights(newData, () => updating.current = false); // Libera após completar
            }
        }
    }, [historico]);

    const [redHeight, setRedHeight] = useState(0);
    const [whiteHeight, setWhiteHeight] = useState(0);
    const [blackHeight, setBlackHeight] = useState(0);

    const updateBarHeights = (newData, callback) => {
        animateValueChange(redHeight, newData.red || 0, setRedHeight, () => {
            animateValueChange(whiteHeight, newData.white || 0, setWhiteHeight, () => {
                animateValueChange(blackHeight, newData.black || 0, setBlackHeight, callback);
            });
        });
    };

    const animateValueChange = (start, end, setter, onDone) => {
        const steps = 20; // Number of steps for the animation
        const increment = (end - start) / steps;
        let stepCount = 0;

        const interval = setInterval(() => {
            stepCount++;
            if (stepCount <= steps) {
                setter(prev => prev + increment);
            } else {
                clearInterval(interval);
                setter(end); // Ensure it reaches the end value
                onDone();
            }
        }, 50); // Adjust timing for smoother animation
    };

    return (
        <BarContainer>
            <RedBar style={{ height: `${redHeight + 20}%` }} />
            <WhiteBar style={{ height: `${whiteHeight + 20}%` }} />
            <BlackBar style={{ height: `${blackHeight + 20}%` }} />
        </BarContainer>
    );
};

export default BarrasVerticais;
