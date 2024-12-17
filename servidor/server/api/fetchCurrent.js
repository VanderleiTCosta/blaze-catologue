const axios = require('axios');

const fetchCurrent = async () => {
    const getCurrent = "https://blaze1.space/api/singleplayer-originals/originals/roulette_games/current/1";
    
    try {
        const response = await axios.get(getCurrent, {
            headers: {
                'Authorization': `Bearer nBq9weDZM3ap0BewFJYozNoxkXojJ6Ep`
            }
        });
        return response.data; // Armazena os dados recebidos do estado atual
    } catch (error) {
        console.error('Erro ao fazer requisição do estado atual:', error.message);
        throw new Error('Erro ao obter estado atual');
    }
};

module.exports = async (req, res) => {
    try {
        const currentData = await fetchCurrent();
        return res.status(200).json(currentData);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};