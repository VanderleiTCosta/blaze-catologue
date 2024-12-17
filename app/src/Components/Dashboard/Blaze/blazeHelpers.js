import helpers from "../../helpers";
import axios from "axios";

const blazeHelpers = {
    atualizarHora: (setCurrentTime) => {
        const now = new Date();
        now.setHours(now.getHours());
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setCurrentTime(formattedTime);
    },

    handleHistoryEdit: (setData, setContagemSurfs, setContagemSurfsBrancos, setPorcentagemQueAsCoresVieram, data, historico, current) => {
        if (historico.length > 0) {
            setData({ History: historico, Current: current });
        }
        
        if (data.History) {
            const historyLength = data.History.length;
    
            // Utilize um único loop para processar todos os dados necessários
            let countWhite = 0, countRed = 0, countBlack = 0;
    
            data.History.forEach(h => {
                if (h.color === 0) countWhite++;
                else if (h.color === 1) countRed++;
                else if (h.color === 2) countBlack++;
            });
    
            setContagemSurfs(helpers.processArray(data.History));
            setContagemSurfsBrancos(helpers.agruparAteBranco(data.History));
            setPorcentagemQueAsCoresVieram({
                black: countBlack / historyLength,
                white: countWhite / historyLength,
                red: countRed / historyLength
            });
        }
    },

    handleColor: (num) => {
        switch (num) {
            case 0:
                return "rgba(0, 0, 0, 0.8)";
            case 1:
                return "rgba(255, 255, 255, 1)";
            case 2:
                return "rgba(255, 255, 255, 1)";
            default:
                return "rgba(0, 0, 0, 1)";
        }
    },

    contarCores: (dados) => {
        let contagem = { branco: 0, vermelho: 0, preto: 0 };

        for (const item of dados) {
            const cor = item.color;
            if (cor === 0) {
                contagem.branco++;
            } else if (cor === 1) {
                contagem.vermelho++;
            } else if (cor === 2) {
                contagem.preto++;
            }
        }

        return contagem;
    },

    handleBackColor: (num) => {
        switch (num) {
            case 0:
                return "rgba(255, 255, 255, 1)";
            case 1:
                return "rgba(170, 0, 0, 1)";
            case 2:
                return "rgba(30, 30, 30, 1)";
            default:
                return "rgba(255, 255, 255, 1)";
        }
    },

    handleImage: (num) => {
        if (num === 0)
            return <img alt="Branco Imagem" src="14x-icon.png" />;
        else if (num === -1)
            return
        return num;
    },

    fetchBets: async (id, setBets) => {
        try {
            const response = await axios.get(`https://servidor.shotcompany.online/obterApostas/${id}`);
            setBets(response.data || []); 
        } catch (error) {
            console.error("Erro ao buscar dados das apostas:", error);
            setBets([]);
        }
    }
}

export default blazeHelpers;