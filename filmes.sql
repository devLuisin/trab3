CREATE TABLE filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    duracao INT NOT NULL,
    nota_imdb DECIMAL(3, 1) NOT NULL
);