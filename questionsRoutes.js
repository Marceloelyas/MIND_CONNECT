const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

// Obter perguntas do banco de dados
router.get('/from-db', (req, res) => {
    connection.query('SELECT * FROM perguntas', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao obter perguntas', error: err });
        }
        res.json(results);
    });
});

// Adicionar uma nova pergunta ao banco de dados
router.post('/', (req, res) => {
    const newQuestion = req.body.question;
    if (!newQuestion) {
        return res.status(400).json({ message: 'Pergunta inválida.' });
    }
    connection.query('INSERT INTO perguntas (question) VALUES (?)', [newQuestion], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao adicionar pergunta', error: err });
        }
        res.status(201).json({ message: 'Pergunta adicionada com sucesso!' });
    });
});

module.exports = router;
