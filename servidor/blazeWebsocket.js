const WebSocket = require('ws');

const url = 'wss://api-gaming.blaze1.space/replication/?EIO=3&transport=websocket';

// Cria uma nova conexão WebSocket
const ws = new WebSocket(url);

ws.on('open', () => {
    console.log('Conectado ao WebSocket:', url);

    // Aqui, você pode enviar uma mensagem inicial ou de registro,
    // supondo que o servidor espera uma mensagem após a conexão.
    ws.send('5'); // Supõe-se que essa seja a mensagem que inicia a interação
});

// Evento quando uma mensagem é recebida
ws.on('message', (data) => {
    // Convertendo buffer em string
    if (Buffer.isBuffer(data)) {
        data = data.toString();
    }
    console.log('Mensagem recebida:', data);
    
    // Tente analisar a mensagem para verificar se contém dados úteis
    try {
        const jsonData = JSON.parse(data);
        console.log('Dados JSON:', jsonData);
        

        if (jsonData.type === 'result') {
            console.log('Resultados:', jsonData.results);
        }
    } catch (err) {
        console.log('Não foi possível analisar a mensagem como JSON:', data);
    }
});


// Evento para lidar com erros
ws.on('error', (error) => {
    console.error('Erro no WebSocket:', error);
});


// Evento quando a conexão é encerrada
ws.on('close', () => {
    console.log('Conexão WebSocket encerrada');
});