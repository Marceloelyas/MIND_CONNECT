
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
//const connection = require('./database/connection');
const questionsRoutes = require('./routes/questionsRoutes');
const e = require('cors');


// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/questions', questionsRoutes);

// Servindo arquivo estáticos da pasta public
app.use(express.static('public'));

// Configuração de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '813323',
    database: 'mind_connect'
});

// Testando a conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
});

// Arrays de perguntas para categorias
const questions = ["Você se sente estressado frequentemente?", "Tem tido problemas para dormir?", "Sente-se motivado a realizar suas atividades diárias?", "Está satisfeito com suas interações sociais?", "Você costuma jogar Videogame?", "Você tem algum esporte favorito?"];
const objetivos = ["Quais são seus objetivos para o próximo ano?", "Como você define sucesso para si mesmo?", "Quais são os principais passos que você está tomando para alcançar seus sonhos?"];
// Adicione outras categorias como no código original

// Rota GET para obter perguntas gerais
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Rota POST para adicionar uma nova pergunta na seção geral
app.post('/api/questions', (req, res) => {
    const newQuestion = req.body.question;
    if (newQuestion) {
        questions.push(newQuestion); // Adiciona a nova pergunta ao array
        res.status(201).send({ message: "Pergunta adicionada com sucesso!", questions });
    } else {
        res.status(400).send({ message: "Pergunta inválida." });
    }
});

// Rota para obter perguntas gerais do banco de dados
app.get('/api/questions/from-db', (req, res) => {
    connection.query('SELECT * FROM perguntas', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao obter perguntas', error: err });
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
