const axios = require('axios');

const fetchHistorico = async () => {
    const now = new Date();
    const startDate_historico = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();
    const endDate_historico = now.toISOString();

    const historico = [];

    const fetchPage = async (page) => {
        const historico_url = `https://blaze1.space/api/singleplayer-originals/originals/roulette_games/recent/history/1?startDate=${startDate_historico}&endDate=${endDate_historico}&page=${page}`;
        try {
            const response = await axios.get(historico_url, {
                headers: {
                    'Authorization': `Bearer nBq9weDZM3ap0BewFJYozNoxkXojJ6Ep`
                }
            });
            return response.data.records;
        } catch (error) {
            console.error(`Erro ao fazer requisição do histórico da página ${page}:`, error.message);
            return []; // Retorna um array vazio em caso de erro
        }
    };

    const pagesToFetch = [1, 2, 3];
    const results = await Promise.all(pagesToFetch.map(page => fetchPage(page)));

    results.forEach(pageRecords => {
        historico.push(...pageRecords);
    });

    return historico;
};

module.exports = async (req, res) => {
    const historico = await fetchHistorico();
    return res.status(200).json(historico);
};