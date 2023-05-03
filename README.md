# Como executar o projeto

### Pré-requisitos
- Docker
- Docker Compose
- Rust (para executar o backend)
- Node.js e Yarn/Npm (para executar o frontend)
- Expo-cli

### Passos

1 . Clone o repositório:

```bash
git clone https://github.com/seu-usuario/netflix-clone.git
```

2 . Execute o comando abaixo para subir o banco de dados PostgreSQL e o pgAdmin:

```bash
docker-compose up -d --build
```

3 . Acesse o pgAdmin em http://localhost:16543, conecte-se ao servidor PostgreSQL e dentro do banco de dados netflix, no schema, vá em Query Tool e crie a tabela usuario com os seguintes comandos:

```sql
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```

4 . No terminal, acesse a pasta backend e execute o comando abaixo para subir o servidor:

```bash
cargo run
```

5 . Ainda no terminal, acesse a pasta app e execute o comando abaixo para subir o Expo:

```bash
yarn start
```

Lembre-se de estar na mesma rede e em uma rede que não bloqueie protocolos TCP/UDP.
