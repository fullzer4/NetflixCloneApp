passos

1 - docker-compose up -d --build 
para subir o bancode de dados postgres e o pgadmin

2 - entrar no pgadmin ( http://localhost:16543 ) se conectar com o servidor postgres e dentro do database netflix e schema va em query tool e crie a tabela usuario com esses comandos:

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)

3 - Subir o backend rodando:

cargo run

4 - Subir o expo rodando:

yarn start

Lembrete:

Lembre de estar na mesma rede e em uma rede que nao bloqueie protocolos tcp/udp.