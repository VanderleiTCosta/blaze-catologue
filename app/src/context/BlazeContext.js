import React, { createContext, useState, useContext, useEffect } from 'react';
import blazeHelpers from '../Components/Dashboard/Blaze/blazeHelpers';

const BlazeContext = createContext();

export const useBlaze = () => useContext(BlazeContext);

export const BlazeProvider = ({ children }) => {
    const [historico, setHistorico] = useState([]);
    const [current, setCurrent] = useState(null);
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('wss://servidor.shotcompany.online');
        let messageQueue = [];
        let batchTimeout = null;

        ws.onopen = () => {
            console.log('Conectado ao WebSocket');
        };

        ws.onmessage = (event) => {
            let novoHistorico = [];
            let novoCurrent = null;

            try {
                const { historico: historicoData, current: currentData } = JSON.parse(event.data);
                novoHistorico = historicoData || []; 
                novoCurrent = currentData || null; 
            } catch (error) {
                console.error('Erro ao processar mensagem do WebSocket:', error);
            }

            messageQueue.push({ novoHistorico, novoCurrent });

            clearTimeout(batchTimeout);
            batchTimeout = setTimeout(() => {
                if (messageQueue.length > 0) {
                    const allHistorico = messageQueue.reduce((acc, msg) => acc.concat(msg.novoHistorico), []);
                    setHistorico(allHistorico);
                    setCurrent(messageQueue[messageQueue.length - 1].novoCurrent);
                    messageQueue = [];
                }
            }, 100);
        };

        ws.onclose = () => {
            console.log('Desconectado do WebSocket');
        };

        ws.onerror = (error) => {
            console.error('Erro no WebSocket:', error);
        };

        return () => {
            clearTimeout(batchTimeout);
            ws.close();
        };
    }, []);

    const fetchBets = async (id) => { blazeHelpers.fetchBets(id, setBets); };

    return (
        <BlazeContext.Provider value={{ historico, current, bets }}>
            {children}
        </BlazeContext.Provider>
    );
};