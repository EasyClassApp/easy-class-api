# Easy Class - API


API REST do projeto Easy Class. 

## Como rodar a aplicação

**Pré-requisitos: Node, NPM e MongoDB.** 

1. Inicie o MongoDB (*mongod*)
2. Instale as dependências do projeto

````
# npm install
````

3. Execute o script para inicializar o servidor:

````
# npm run start
````

4. Para executar os testes:

````
# npm run test
````

## Como rodar a aplicação com Docker

**Pré-requisitos: Docker, (no Windows, habilitar Hyper-V)** 

Cria imagem e executa container para desenvolvimento:

````
  # docker-compose up app
````

A aplicação em modo de desenvolvimento ficará disponível em **localhost:3000**

Para executar os testes:

````
  # docker-compose run test
````
