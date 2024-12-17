const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://blaze1.space/pt/games/double');
        return res.status(200).send(response.data);
    } catch (error) {
        return res.status(500).send('Erro ao obter dados');
    }
};