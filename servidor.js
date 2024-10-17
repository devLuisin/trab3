const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// Criar ou abrir o banco de dados
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Criar a tabela filmes se não existir
        db.run(`CREATE TABLE IF NOT EXISTS filmes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            genero TEXT NOT NULL,
            duracao INTEGER NOT NULL,
            nota_imdb REAL NOT NULL
        );`);
    }
});

const server = http.createServer((req, res) => {
    // Define o caminho do arquivo HTML baseado na URL requisitada
    let filePath = path.join(__dirname, req.url === '/' ? 'inicio.html' : req.url);

    // Ajuste o caminho para incluir a extensão .html se necessário
    if (req.url === '/add.html' || req.url === '/rmv.html') {
        filePath = path.join(__dirname, req.url);
    } else {
        filePath = path.join(__dirname, 'inicio.html');
    }

    // Lê o arquivo e envia a resposta
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Página não encontrada.');
            return;
        }

        // Responde com o conteúdo do arquivo HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// Inicie o servidor
server.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
