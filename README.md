### ✅ Pré-requisitos

* Versão do node: 16+

___

## 📝 Instruções para inicializar o projeto

Para que as tabelas do banco de dados sejam criada e populadas com os dados iniciais, é necessário executar o comando:

`npm run db:reset`
___
## 🧑‍💻 Habilidades Desenvolvidas

  * Criar uma API usando `Express`, `MySQL`, `Sequelize` em `Typescript`;

  * Estabelecer a relação entre as entidades do banco de dados com o ORM `Sequelize`;

  * Garantir a integridade do banco de dados com o uso de `transactions` no `Sequelize`;

  * Aplicar conceitos de arquitetura baseada em camadas;

  * Criar endpoints para realizar operações _CRUD_;

  * Escrever testes de integração;

  * Escrever testes unitários;

___
## 🧑‍🔬 Testes

A aplicação possui *testes de integração* e *testes unitários*. Para tanto, foram utilizados os frameworks `Mocha`, `Chai`, `Sinon` e `Chai-http`.

Para executar os testes, você poderá executar os seguintes comandos:

`npm run test` para executar todos os testes com o `Mocha`;
`npm run test:coverage` para checar a cobertura de testes.

___
## 💻 Tecnologias usadas

  * NodeJS

  * Express

  * Nodemon

  * TypeScript

  * Sequelize

  * MYSQL

  * Docker

  * Mocha

  * Chai

  * Sinon

  * Chai-http

  * bcrypt

  * jsonwebtoken

  * dotenv

## 🐋 Rodando o projeto com Docker
Para rodar o projeto utilizando docker, no diretório da aplicação execute o comando:

`docker-compose up -d`

Para acompanhar os logs do container do servidor backend, com nodemon já em execução:

`docker logs -n 50 -f trybesmith_api`

___

### ⭐️

Se este repositório te ajudou de alguma forma, deixe uma ⭐️!
