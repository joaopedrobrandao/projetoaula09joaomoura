const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();;
const port = 3000;
const path = require('path');
const db = new sqlite3.Database('./data/banco.db');

app.use(express.static("frontend"))

app.get('/', (req, res) => {
    const filePath = path.resolve('./frontend/insere.html');
    res.sendFile(filePath);
});


app.use(express.json());

app.post('/servidor', (req, res) => {
  const { informacao } = req.body;

  db.run("INSERT INTO Mensagem (Mensagens) VALUES (?)", informacao, function(err) {
    if (err) {
      console.error('Erro ao inserir', err);
      res.status(500).json({ error: 'Erro' });
    } else {
      console.log('Informação inserida');
      res.sendStatus(200);
    }
  });
});

// mostrar lista

app.get('/dados', (req, res) => {
    db.all("SELECT * FROM Mensagem", function(err, rows) {
      if (err) {
        console.error('Erro', err);
        res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
      } else {
        console.log('Dados obtidos');
        res.json(rows);
      }
    });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

  