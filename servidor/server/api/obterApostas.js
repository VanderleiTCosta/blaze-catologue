const axios = require('axios');

const obterValoresApostas = async (id) => {
    try {
        let allBets = [];
        let page = 1;
        let totalBetPages = 1;

        const firstResponse = await axios.get(`https://blaze1.space/api/singleplayer-originals/originals/roulette_games/${id}?page=1`, {
            headers: {
                'Authorization': `Bearer nBq9weDZM3ap0BewFJYozNoxkXojJ6Ep`
            }
        });        if (firstResponse.data.bets) {
            allBets = allBets.concat(firstResponse.data.bets);
            totalBetPages = firstResponse.data.totalBetPages || totalBetPages;
        } else {
            return null;
        }

        for (page = 2; page <= totalBetPages; page++) {
            try {
                const response = await axios.get(`https://blaze1.space/api/singleplayer-originals/originals/roulette_games/${id}?page=${page}`);
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

module.exports = async (req, res) => {
    const { id } = req.query; // Pegar ID da query
    const resposta = await obterValoresApostas(id);
    
    if (resposta) {
        return res.status(200).json(resposta);
    } else {
        return res.status(500).send("Erro ao obter apostas");
    }
};