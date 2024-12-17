const helpers = {

    calcularPorcentagemCoresMinutosFinais: (dados) => {
        const minutosFinais = {}; // Objeto para armazenar as contagens por minutos finais.
        const totalPorcentagem = {}; // Objeto para armazenar o total de cores para cada minuto final
        const todasCores = new Set(); // Conjunto para armazenar todas as cores únicas

        // Iterar sobre os dados
        for (const item of dados) {
            const dataCriacao = new Date(item.created_at); // Converte a data em objeto Date
            const minuto = dataCriacao.getUTCMinutes(); // Obtém os minutos da data
            const cor = item.color; // Assume que item.color existe
            const minutoFinal = minuto % 10; // Obtemos o último dígito do minuto

            // Adiciona a cor ao conjunto de todas as cores
            todasCores.add(cor);

            // Inicializa os objetos caso não existam
            if (!minutosFinais[minutoFinal]) {
                minutosFinais[minutoFinal] = {};
                totalPorcentagem[minutoFinal] = 0; // Inicializa o total para esse minuto
            }

            // Conta as cores para o minuto final específico
            if (minutosFinais[minutoFinal][cor]) {
                minutosFinais[minutoFinal][cor]++;
            } else {
                minutosFinais[minutoFinal][cor] = 1;
            }

            // Incrementa o total de cores para esse minuto final
            totalPorcentagem[minutoFinal]++;
        }

        // Calcula a porcentagem das cores nos minutos finais
        const resultadosPorcentagem = [];

        for (const minuto in minutosFinais) {
            const porcentagens = [];

            // Para cada cor única, adiciona a porcentagem
            todasCores.forEach(cor => {
                const count = minutosFinais[minuto][cor] || 0; // Obtém a contagem ou 0 se não estiver presente
                const porcentagem = ((count / totalPorcentagem[minuto]) * 100).toFixed(2); // Calcula a porcentagem
                porcentagens.push({ cor, porcentagem: `${porcentagem}%` });
            });

            resultadosPorcentagem.push({ minuto: minuto, cores: porcentagens });
        }

        return resultadosPorcentagem; // Retorna o resultado final das porcentagens
    },

    calcularPadroesMaisRepetidos: (dados) => {
        const padroes = {};   // Objeto para armazenar os padrões e suas contagens.
        const minTamanho = 3; // Tamanho mínimo do padrão
        const maxTamanho = 5; // Tamanho máximo do padrão
        const totalDados = dados.length;

        // Percorrer os dados e procurar padrões
        for (let i = 0; i <= totalDados - minTamanho; i++) {
            for (let size = minTamanho; size <= maxTamanho; size++) {
                // Garantir que não ultrapasse o limite do array
                if (i + size <= totalDados) {
                    // Criar um padrão de cores
                    const padrao = dados.slice(i, i + size).map(item => item.color).join('-'); // Exemplo: "1-1-2"

                    // Contar ocorrências do padrão
                    if (padroes[padrao]) {
                        padroes[padrao]++;
                    } else {
                        padroes[padrao] = 1; // Inicializa o contador para o padrão
                    }
                }
            }
        }

        // Converter o objeto de padrões para um array e ordenar por frequência
        const resultados = Object.entries(padroes)
            .filter(([_, count]) => count > 1) // Filtrando apenas padrões que apareceram mais de 1 vez
            .sort((a, b) => b[1] - a[1]) // Ordena pelo número de ocorrências
            .slice(0, 10) // Limita ao top 5 resultados
            .map(([padrao, frequencia]) => ({ padrao, frequencia }));

        return resultados;
    },

    calcularPorcentagemPorMinuto: (dados) => {
        const resultados = [];

        const now = new Date();

        dados.forEach(item => {
            const date = (new Date(item.created_at));
            const hourUTC3 = date.getUTCHours() - 3;
            const adjustedHour = (hourUTC3 < 0) ? 24 + hourUTC3 : hourUTC3;
            const minute = date.getUTCMinutes();

            const timeKey = `${String(minute).padStart(2, '0')}`;

            if (!resultados[parseFloat(timeKey)]) {
                resultados[parseFloat(timeKey)] = { time: timeKey, red: 0, black: 0, white: 0, total: 0 };
            } else {
                resultados[parseFloat(timeKey)].total += 1;
                if (item.color === 0) {
                    resultados[parseFloat(timeKey)].white += 1
                }
                if (item.color === 1) {
                    resultados[parseFloat(timeKey)].red += 1
                }
                if (item.color === 2) {
                    resultados[parseFloat(timeKey)].black += 1
                }
            }
        });
        return resultados;
    },

    calcularPorcentagemPorHora: (data) => {
        const results = {};

        data.forEach(item => {
            const date = new Date(item.created_at);
            const hourUTC3 = date.getUTCHours() - 3;

            const adjustedHour = (hourUTC3 < 0) ? 24 + hourUTC3 : hourUTC3;

            const hour = String(adjustedHour).padStart(2, '0');

            if (!results[hour]) {
                results[hour] = { time: `${hour}:00`, red: 0, black: 0, white: 0, total: 0 };
            }

            if (item.color === 0) {
                results[hour].white += 1;
            } else if (item.color === 1) {
                results[hour].red += 1;
            } else if (item.color === 2) {
                results[hour].black += 1;
            }

            results[hour].total += 1;
        });

        const formattedResults = Object.values(results).map(result => {
            const total = result.total;

            return {
                time: result.time,
                red: result.red,
                black: result.black,
                white: result.white,
                redPercentage: ((result.red / total) * 100).toFixed(2) + '%',
                blackPercentage: ((result.black / total) * 100).toFixed(2) + '%',
                whitePercentage: ((result.white / total) * 100).toFixed(2) + '%'
            };
        });

        // Reverter a ordem dos resultados
        return formattedResults.reverse();
    },


    calcularItensPorHora: (dados) => {
        const porHora = {};

        dados.forEach(({ color, time }) => {
            const hour = time.split(':')[0] + ":00";

            if (!porHora[hour]) {
                porHora[hour] = { red: 0, black: 0, white: 0, total: 0 };
            }

            porHora[hour][color]++;
            porHora[hour].total++;
        });

        return Object.entries(porHora).map(([hour, counts]) => {
            const { red, black, white, total } = counts;
            return {
                hour,
                red: (red),
                black: (black),
                white: (white)
            };
        });
    },

    handleTime: (time) => {
        if (time) {
            return time.split(":")[0] + ":" + time.split(":")[1]
        }
    },

    handleObterUltimaCaidaDeBranco: (ultimasJogadas) => {
        if (ultimasJogadas && ultimasJogadas.length > 0) {
            for (let i = 0; i < ultimasJogadas.length; i++) {
                if (ultimasJogadas[i].color === 0) {
                    return helpers.formatarData(ultimasJogadas[i].created_at);
                }
            }
        }
        return "null";
    },

    handleObterUltimaCaidaDe2Brancos: (ultimasJogadas) => {
        if (ultimasJogadas && ultimasJogadas.length > 1) {
            for (let i = 0; i < ultimasJogadas.length - 1; i++) {
                if (ultimasJogadas[i].color === 0 && ultimasJogadas[i + 1].color === 0) { // Compara a jogada atual com a próxima
                    return helpers.formatarData(ultimasJogadas[i].created_at); // Retorna a data da primeira ocorrência
                }
            }
        }
        return null;
    },

    porcentagemTodosOsTempos: (a) => {
        if (a && a.length > 0) {
            var countRed = 0;
            var countBlack = 0;
            var countWhite = 0;

            for (let i = 0; i < a.length; i++) {
                if (a[i] && a[i].color) {
                    if (a[i].color === 0)
                        countWhite++;
                    else if (a[i].color === 1)
                        countRed++;
                    else if (a[i].color === 2)
                        countBlack++;
                }
            }

            return { white: ((countWhite / a.length) * 100), red: ((countRed / a.length) * 100), black: ((countBlack / a.length) * 100) }
        }
    },


    processArray: (arr) => {
        if (!arr || arr.length === 0) return [];

        const resultado = [];
        let contador = 1; // Inicia o contador para o primeiro elemento

        for (let i = 1; i < arr.length; i++) {
            if (arr[i].color === arr[i - 1].color) {
                contador++; // Aumenta o contador se a cor for igual à anterior
            } else {
                if (resultado.length < 40)
                    resultado.push({ color: arr[i - 1].color, qtt: contador });
                contador = 1; // Reseta o contador para o novo grupo
            }
        }

        // Adiciona o último grupo ao resultado
        resultado.push({ color: arr[arr.length - 1].color, qtt: contador });

        return resultado;
    },

    agruparAteBranco: (arr) => {
        const resultado = [];
        let contadorTotal = 0;
        let primeiroCreatedAt = null;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].color === 0) {
                // Quando encontrar um branco, adiciona o grupo ao resultado, se houver
                if (contadorTotal > 0) {
                    resultado.push({
                        qtt: contadorTotal,
                        created_at: primeiroCreatedAt
                    });
                }
                // Reseta os contadores e o created_at
                contadorTotal = 0;
                primeiroCreatedAt = null;
            } else {
                // Inicializa o created_at no início do grupo
                if (primeiroCreatedAt === null) {
                    primeiroCreatedAt = helpers.formatarHora(arr[i].created_at);
                }
                // Conta as ocorrências de vermelho ou preto
                if (arr[i].color === 1 || arr[i].color === 2) {
                    contadorTotal++;
                }
            }
        }

        // Adiciona o último grupo acumulado, se houver
        if (contadorTotal > 0) {
            resultado.push({
                qtt: contadorTotal,
                created_at: primeiroCreatedAt
            });
        }

        return resultado;
    },

    formatarHora: (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours());

        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');

        return `${horas}:${minutos}`;
    },

    formatarData: (dataISO) => {
        try {
            const data = new Date(dataISO);

            if (isNaN(data.getTime())) {
                throw new Error("Data inválida");
            }

            const dataBrasilia = new Date(data.getTime() - (3 * 60 * 60 * 1000)); // UTC-3
            const horas = String(dataBrasilia.getUTCHours()).padStart(2, '0');
            const minutos = String(dataBrasilia.getUTCMinutes()).padStart(2, '0');

            return `${horas}:${minutos}`;
        } catch (error) {
            console.error(error); //
            return null; // Retorna null em caso de erro
        }
    },

    predictNextColor: (events) => {
        // Filtra para incluir apenas eventos com cores 1 e 2
        const filteredEvents = events.filter(event => event.color === 1 || event.color === 2);

        if (filteredEvents.length === 0) {
            // Retorna um valor padrão se não houver eventos
            return null;
        }

        // Estrutura para armazenar sequências e contagens
        let sequences = [];
        let currentColor = null;
        let currentSequenceLength = 0;

        // Análise dos eventos
        for (const event of filteredEvents) {
            if (event.color === currentColor) {
                currentSequenceLength++;
            } else {
                if (currentColor !== null) {
                    // Adiciona a sequência anterior
                    sequences.push({ color: currentColor, length: currentSequenceLength });
                }
                // Reseta para a nova cor
                currentColor = event.color;
                currentSequenceLength = 1;
            }
        }

        // Captura a última sequência
        if (currentColor !== null) {
            sequences.push({ color: currentColor, length: currentSequenceLength });
        }

        const lastSequence = sequences[sequences.length - 1];

        const totalSequences = sequences.length;

        let predictedColor = lastSequence.color;
        let breakSequence = false;

        if (lastSequence.length > 5) {
            breakSequence = true;
        }

        if (breakSequence) {
            predictedColor = lastSequence.color === 1 ? 2 : 1;
        } else if (totalSequences > 1) {
            const penultimateSequence = sequences[totalSequences - 2];

            if (penultimateSequence.color !== lastSequence.color && penultimateSequence.length < lastSequence.length) {
                predictedColor = penultimateSequence.color;
            }
        }

        return predictedColor;
    },

    processaRolls: (arr) => {
        const resultado = [];
        const rollsMap = {};

        for (let i = 0; i < arr.length; i++) {
            const { roll, color, created_at } = arr[i];
            const key = `${roll}-${color}`;

            if (!(key in rollsMap)) {
                rollsMap[key] = {
                    qtt: resultado.length,
                    created_at
                };

                resultado.push({ roll, color, qtt: rollsMap[key].qtt, created_at: rollsMap[key].created_at });
            }
        }

        return resultado;
    },

    calcularProbabilidadesPedras: (historico) => {
        const probabilidades = {};

        // Percorre o histórico
        for (let i = 0; i < historico.length - 1; i++) {
            const { roll, color } = historico[i];
            const nextColor = historico[i + 1].color; // A próxima cor após o roll atual

            // Se o roll ainda não foi adicionado, inicializa sua probabilidade
            if (!probabilidades[roll]) {
                probabilidades[roll] = {
                    counts: { 0: 0, 1: 0, 2: 0 }, // Contadores para cada cor
                    total: 0 // Total de ocorrências desse roll
                };
            }

            // Aumenta o contador total para o roll
            probabilidades[roll].total++;

            if (nextColor !== undefined) { // Verifica se nextColor existe
                probabilidades[roll].counts[nextColor]++;
            }
        }

        const resultado = {};
        for (const roll in probabilidades) {
            const { counts, total } = probabilidades[roll];

            // Evita divisão por zero
            resultado[roll] = {
                probabilityOfNextIsWhite: total > 0 ? (counts[0] / total) * 100 : 0,
                probabilityOfNextIsRed: total > 0 ? (counts[1] / total) * 100 : 0,
                probabilityOfNextIsBlack: total > 0 ? (counts[2] / total) * 100 : 0,
            };
        }

        return resultado;
    },

    calcularProbabilidadesPedras2: (historico, quantidadePedras) => {
        if (historico.length < quantidadePedras) return {};

        // Pega as primeiras 'quantidadePedras'
        const sequenciaSelecionada = historico.slice(0, quantidadePedras);

        // Contadores para as cores
        const contagem = {
            white: 0,
            red: 0,
            black: 0,
        };

        // Analisando o histórico completo
        for (let i = quantidadePedras; i < historico.length; i++) {
            // Verifica se a sequência atual é igual à sequência selecionada
            const sequenciaAtual = historico.slice(i - quantidadePedras, i);
            const sequenciaIgual = sequenciaAtual.every((item, index) =>
                item.color === sequenciaSelecionada[index].color
            );

            if (sequenciaIgual) {
                const proximaCor = historico[i]?.color;
                if (proximaCor === 0) contagem.white++;
                else if (proximaCor === 1) contagem.red++;
                else if (proximaCor === 2) contagem.black++;
            }
        }

        // Total de casos em que a próxima cor foi contada
        const totalCasos = contagem.white + contagem.red + contagem.black;

        // Calcular a probabilidade
        return {
            probabilityOfNextIsWhite: totalCasos > 0 ? (contagem.white / totalCasos) * 100 : 0,
            probabilityOfNextIsRed: totalCasos > 0 ? (contagem.red / totalCasos) * 100 : 0,
            probabilityOfNextIsBlack: totalCasos > 0 ? (contagem.black / totalCasos) * 100 : 0,
        };
    },

    probabilidadeMartinGale: (historico, quantidadePedras) => {
        if (historico.length < quantidadePedras) return [];

        const resultados = [];

        // Função para adicionar os resultados
        const adicionarResultado = (previsao, real, corPrevista, timestamp, roll) => {
            let resultado = {
                prediction: previsao,
                roll: roll,
                actual: real,
                red: '',
                black: '',
                white: '',
                createdAt: timestamp, // Adiciona o timestamp
            };

            // Verificação básica
            if (real === 0) {
                resultado.white = 'SG'; // Sempre que cair branco
            } else if (real === 1 && previsao === 'red') {
                resultado.red = 'SG'; // Foi vermelho e previu vermelho
            } else if (real === 2 && previsao === 'black') {
                resultado.black = 'SG'; // Foi preto e previu preto
            } else {
                // Verificação para G1
                if (corPrevista === 'red') {
                    if (real === 0) {
                        resultado.white = 'G1';
                    } else if (real === 1) {
                        resultado.red = 'G1';
                    } else {
                        resultado.black = 'G1'; // Caiu preto, G1 vermelho
                    }
                } else if (corPrevista === 'black') {
                    if (real === 0) {
                        resultado.white = 'G1';
                    } else if (real === 2) {
                        resultado.black = 'G1';
                    } else {
                        resultado.red = 'G1'; // Caiu vermelho, G1 preto
                    }
                }
            }

            resultados.push(resultado);
        };

        // Pega as primeiras 'quantidadePedras'
        const sequenciaSelecionada = historico.slice(0, quantidadePedras);

        // Analisando o histórico completo
        for (let i = quantidadePedras; i < historico.length; i++) {
            // Verifica se a sequência atual é igual à sequência selecionada
            const sequenciaAtual = historico.slice(i - quantidadePedras, i);
            const sequenciaIgual = sequenciaAtual.every((item, index) =>
                item.color === sequenciaSelecionada[index].color
            );

            if (sequenciaIgual) {
                const proximaCor = historico[i]?.color;
                let previsao = '';
                let corPrevista = ''; // Define corPrevista
                const timestamp = helpers.converterDataParaHoraMin(historico[i].created_at); // Captura o created_at da última pedra da sequência
                let acertou = false; // Para rastrear se houve acerto

                // Faz a previsão para a próxima cor
                if (proximaCor === 0) {
                    previsao = 'white'; // Considerando que caiu branco
                    corPrevista = 'white'; // Define corPrevista para a próxima iteração
                    adicionarResultado('white', proximaCor, corPrevista, timestamp, historico[i]?.roll);
                    acertou = true; // Acertou em branco
                } else if (proximaCor === 1) {
                    previsao = 'red';
                    corPrevista = 'red'; // Define corPrevista para a próxima iteração
                    adicionarResultado('red', proximaCor, corPrevista, timestamp, historico[i]?.roll);
                    acertou = true; // Acertou em vermelho
                } else if (proximaCor === 2) {
                    previsao = 'black';
                    corPrevista = 'black'; // Define corPrevista para a próxima iteração
                    adicionarResultado('black', proximaCor, corPrevista, timestamp, historico[i]?.roll);
                    acertou = true; // Acertou em preto
                }

                // Verifica a próxima pedra após a próxima cor
                const proximaPosicao = i + 1;
                if (proximaPosicao < historico.length) {
                    const segundaProximaCor = historico[proximaPosicao]?.color;

                    // Analisando a próxima cor
                    if (corPrevista === 'red') {
                        if (segundaProximaCor === 0 || segundaProximaCor === 1) {
                            adicionarResultado('red', segundaProximaCor, corPrevista, timestamp, historico[i]?.roll);
                            acertou = true; // Teve um acerto aqui
                        } else {
                            adicionarResultado('black', segundaProximaCor, 'black', timestamp, historico[i]?.roll);
                        }
                    } else if (corPrevista === 'black') {
                        if (segundaProximaCor === 0 || segundaProximaCor === 2) {
                            adicionarResultado('black', segundaProximaCor, corPrevista, timestamp, historico[i]?.roll);
                            acertou = true; // Teve um acerto aqui
                        } else {
                            adicionarResultado('red', segundaProximaCor, 'red', timestamp, historico[i]?.roll);
                        }
                    }
                }

                // Se na terceira vez não acertou, adiciona "X"
                if (!acertou) {
                    // Adiciona um resultado com "X" em vez das tags
                    resultados.push({
                        prediction: previsao,
                        actual: proximaCor,
                        red: 'X',
                        black: 'X',
                        white: 'X',
                        createdAt: timestamp,
                    });
                }
            }
        }

        return resultados; // Retorna o array de resultados
    },

    converterDataParaHoraMin: (dataISO) => {
        // Criação de um objeto de data a partir da string ISO
        const dataUtc = new Date(dataISO);

        // Ajusta para UTC-3 (Horário de Brasília)
        const dataBrasilia = new Date(dataUtc.getTime() - (3 * 60 * 60 * 1000));

        // Extrai hora e minuto
        const horas = String(dataBrasilia.getUTCHours()).padStart(2, '0'); // Hora em formato 00
        const minutos = String(dataBrasilia.getUTCMinutes()).padStart(2, '0'); // Minuto em formato 00

        return `${horas}:${minutos}`;
    },

    handleItColor: (it) => {
        switch (it.trim()) {
            case "SG":
                return "rgba(50, 230, 0, 1)";
            case "G1":
                return "rgba(50, 230, 0, 1)";
            case "G2":
                return "rgba(50, 230, 0, 1)";
            default:
                return "rgba(255, 100, 0, 1)";
        }
    }
}

export default helpers;