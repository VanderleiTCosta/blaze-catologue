const express = require('express');
const { chromium } = require('playwright');
const admin = require('firebase-admin');

// Inicializar o Firebase Admin
const serviceAccount = require('./chave.json'); // Certifique-se de que o nome e caminho estão corretos.

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://blaze-jon-15807.firebaseio.com" // Substitua pelo URL correto do seu Firestore
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 2000;

let lastRedCounter = null;
let lastBlackCounter = null;
let lastWhiteCounter = null;

const url = 'https://blaze1.space/pt/games/double';

// Função para buscar os dados e atualizar o Firestore
const fetchData = async () => {
    const browser = await chromium.launch({
        headless: true // Executar em modo headless
    });

    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle' });

        const result = await page.evaluate(() => {
            const redCounter = document.querySelector('.roulette-column.red .right .total .counter span')?.innerText || 'Counter red não encontrado.';
            const blackCounter = document.querySelector('.roulette-column.black .right .total .counter span')?.innerText || 'Counter black não encontrado.';
            const whiteCounter = document.querySelector('.roulette-column.white .right .total .counter span')?.innerText || 'Counter white não encontrado.';

            return { redCounter, blackCounter, whiteCounter };
        });

        console.log('Result:', result);

        const currentRedCounter = parseFloat(result.redCounter.replace("R$", "").replace(",", ""));
        const currentBlackCounter = parseFloat(result.blackCounter.replace("R$", "").replace(",", ""));
        const currentWhiteCounter = parseFloat(result.whiteCounter.replace("R$", "").replace(",", ""));

        // Atualizar Firestore se o valor mudou
        if (currentRedCounter !== lastRedCounter) {
            await db.collection('VALORES_APOSTAS').doc('RED').set({ VALOR: currentRedCounter });
            lastRedCounter = currentRedCounter; // Atualiza o valor armazenado
        }

        if (currentBlackCounter !== lastBlackCounter) {
            await db.collection('VALORES_APOSTAS').doc('BLACK').set({ VALOR: currentBlackCounter });
            lastBlackCounter = currentBlackCounter; // Atualiza o valor armazenado
        }

        if (currentWhiteCounter !== lastWhiteCounter) {
            await db.collection('VALORES_APOSTAS').doc('WHITE').set({ VALOR: currentWhiteCounter });
            lastWhiteCounter = currentWhiteCounter; // Atualiza o valor armazenado
        }

    } catch (error) {
        console.error('Erro ao buscar os dados', error);
    } finally {
        await browser.close(); // Fecha o navegador
    }
};

// Atualizar os dados a cada 5 segundos
setInterval(fetchData, 1000);

// Rota para retornar os valores
app.get('/valoresApostas', (req, res) => {
    res.json({
        red: lastRedCounter,
        black: lastBlackCounter,
        white: lastWhiteCounter,
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});