const https = require('https'); // Importa o módulo HTTPS
const fs = require('fs'); // Importa o módulo FS para acessar o sistema de arquivos
const WebSocket = require('ws'); // Importa o módulo WebSocket
const express = require('express'); // Importa o Express
const axios = require('axios'); // Importa o Axios
const cors = require('cors'); // Importa o CORS

// Carregar os certificados SSL
const serverOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/shotcompany.online/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/shotcompany.online/fullchain.pem')
};

const app = express();
const port = 443;
const wssPort = 8081;

const server = https.createServer(serverOptions, app);
const wss = new WebSocket.Server({ server });

let historico = [];
let currentData = {};

app.use(cors());

const fetchHistorico = async () => {
    const now = new Date();
    const startDate_historico = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();
    const endDate_historico = now.toISOString();

    const historico = [];

    const fetchPage = async (page) => {
        const historico_url = `https://jonbet.com/api/singleplayer-originals/originals/roulette_games/recent/history/1?startDate=${startDate_historico}&endDate=${endDate_historico}&page=${page}`;
        try {
            const response = await axios.get(historico_url);
            return response.data.records;
        } catch (error) {
            console.error(`Erro ao fazer requisição do histórico da página ${page}:`, error.message);
            return [];
        }
    };

    const pagesToFetch = [1, 2, 3];
    const results = await Promise.all(pagesToFetch.map(page => fetchPage(page)));

    results.forEach(pageRecords => {
        historico.push(...pageRecords); 
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ historico, current: currentData }));
        }
    });
};

const fetchCurrent = async () => {
    const getCurrent = "https://jonbet.com/api/singleplayer-originals/originals/roulette_games/current/1";

    try {
        const response = await axios.get(getCurrent);
        currentData = response.data;

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ historico, current: currentData })); 
            }
        });
    } catch (error) {
        console.error('Erro ao fazer requisição do estado atual:', error.message);
    }
};

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.send(JSON.stringify({ historico, current: currentData }));

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

const obterValoresApostas = async (id) => {
    try {
        let allBets = [];
        let page = 1;
        let totalBetPages = 1;

        const firstResponse = await axios.get(`https://jonbet.com/api/singleplayer-originals/originals/roulette_games/${id}?page=1`);
        if (firstResponse.data.bets) {
            allBets = allBets.concat(firstResponse.data.bets);
            totalBetPages = firstResponse.data.totalBetPages || totalBetPages; // Define como 1 caso não esteja definido
        } else {
            return null;
        }

        for (page = 2; page <= totalBetPages; page++) {
            try {
                const response = await axios.get(`https://jonbet.com/api/singleplayer-originals/originals/roulette_games/${id}?page=${page}`);
                if (response.data.bets && response.data.bets.length) {
                    allBets = allBets.concat(response.data.bets);
                }
            } catch (error) {
                console.error(`Erro ao buscar dados da página ${page}:`, error.message);
                break;
            }
        }

        const totalBetRed = allBets.filter(bet => bet.color === 1).reduce((acc, bet) => acc + bet.amount, 0);
        const totalBetWhite = allBets.filter(bet => bet.color === 0).reduce((acc, bet) => acc + bet.amount, 0);
        const totalBetBlack = allBets.filter(bet => bet.color === 2).reduce((acc, bet) => acc + bet.amount, 0);
        const totalGain = allBets.filter(bet => bet.status === 'payout').reduce((acc, bet) => acc + bet.win_amount, 0);

        return {
            id: firstResponse.data.id,
            created_at: firstResponse.data.created_at,
            color: firstResponse.data.color,
            roll: firstResponse.data.roll,
            totalBetRed,
            totalBetWhite,
            totalBetBlack,
            totalGain
        };

    } catch (error) {
        console.error('Erro ao obter dados das apostas:', error.message);
        return null;
    }
};

app.get('/obterApostasJon/:id', async (req, res) => {
    const { id } = req.params;
    const resposta = await obterValoresApostas(id);

    console.log("Requisição feita.");
    if (resposta) {
        console.log("Apostas obtidas com sucesso");
        return res.status(200).json(resposta);
    } else {
        console.log("Erro ao obter apostas");
        return res.status(500).send("Erro ao obter apostas");
    }
});

app.get('/proxy', async (req, res) => {
    console.log("snj");
    try {
        const response = await axios.get('https://jonbet.com/pt/games/double');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Erro ao obter dados');
    }
});

server.listen(port, () => {
    console.log(`Servidor HTTPS rodando na porta ${port}`);
});

setInterval(fetchHistorico, 2000);
setInterval(fetchCurrent, 2000);

console.log(`Servidor WebSocket em execução na porta ${wssPort} e buscando dados...`);