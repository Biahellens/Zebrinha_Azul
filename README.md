# Zebrinha_Azul

Projeto referente a um sistema robusto e escalável para integrar, processar e analisar os dados de clima e tráfego que a Zebrinha Azul coleta.

- [Zebrinha_Azul](#Zebrinha_Azul)
  - [APIS](#apis)
    - [Weather](#Weather)
    - [TOMTOM](#TOMTOM)
  - [Tecnologias](#tecnologias)
  - [Inicializando](#inicializando)
    - [Client](#client)
    - [Server](#server)
   
## APIS

Para termos dados inseridos no projeto foi utilizados de Libs que oferecem APIs gratuitas, tais quais vamos precisar preencher as credenciais em nosso arquivo .env

### Weather

- [WEATHER API](https://www.weatherapi.com/)

No Weather API nos obtemos a nossa APIKEY que inserimos no nosso .env desta forma:

```bash
  WEATHERAPIKEY=suakeydoweatheraqui
```

Caso você queira dados do clima de um local e data especifica você pode atualizar no arquivo WeatherAPI.ts os seguintes campos:

```bash
  const cityName = 'São Paulo';
  const date = '2024-01-01';
```

E rodar novamente para atualizar nosso json file.

```bash
  cd server/src/data
  npx tsc weatherAPI.ts
  node weatherAPI.js
```

### TOMTOM

- [TOMTOM API](https://developer.tomtom.com/)

No TOMTOM API nos obtemos a nossa APIKEY que inserimos no nosso .env desta forma:

```bash
  TOMTOMAPIKEY=suakeydoTOMTOMaqui
```

Caso você queira dados do transito de um ponto a outro diferente você pode atualizar no arquivo tomtomAPI.ts os seguintes campos:

```bash
  const saoPauloCoords = '-23.5505,-46.6333'
  const rioDeJaneiroCoords = '-22.9068,-43.1729'
```

E rodar novamente para atualizar nosso json file.

```bash
  cd server/src/data
  npx tsc tomtomAPI.ts
  node tomtomAPI.js
```

## Tecnologias

Para o desenvolvimento deste projeto, foi utilizado as seguintes tecnologias:

- [Node](https://nodejs.org/en/);
- [React](https://pt-br.reactjs.org/);
- [TypeScript](https://www.typescriptlang.org/);
- [Redux](https://redux.js.org/);
- [React-Router-dom](https://reactrouter.com/en/main);
- [Styled-components](https://styled-components.com/);
- [Material-UI](https://mui.com/material-ui/getting-started/);
- [Typeorm](https://typeorm.io/);
- [Express](https://expressjs.com/pt-br/);
- [PostgreSQL](https://www.postgresql.org/);
- [Docker](https://www.docker.com/);
- [Moment](https://momentjs.com/).

## Inicializando

### Banco de dados:

O desenvolvimento do nosso banco de dados em Postgres utilizamos da imagem do Postgres a partir do docker, que ficará disponivel na porta 5432. Para o banco de dados também é necessário que preenchamos nosso file .env com os seguintes campos:

```bash
  DATABASE_USER=user123
  DATABASE_PASSWORD=senha123
  DATABASE_DB=zebrinhaAzul
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
```

Para iniciar nosso banco de dados o primeiro passo é acessar a nossa pasta api e database:

```bash
$ cd server/database
```

Em seguida precisamos iniciar o container do PostgreSQL:

```bash
$ docker-compose up -d
```

agora precisamos criar nossas migrations no banco de dados:

```bash
$ cd ..
$ npm run migration:run
```

### Server:

A nossa Server foi construida utilizando o Node.js utilizando Express e TypeScript, e o TypeORM. Utilizei também do bycript para a encriptação de senhas. Para o server também é necessário que preenchamos nosso file .env com os seguinte campo:

```bash
  PORT=3000
```

Antes de iniciar, precisa-se instalar as dependências, para isso utilizamos o npm como nosso gerenciador de dependencias e excutamos o seguinte comando no terminal:

```bash
$ cd server
$ npm install
```

agora, podemos estar inicializando com através do comando:

```bash
$ npm run dev
```

### Iniciando o Front-end:

O nosso front-end foi inciado utilizando vite com o uso de React + Typescript e fazendo uso da biblioteca do Material UI para componentização e criação do design do projeto. O design do projeto foi criado a partir de cores e imgs/icons que remetem o agro e o campo, tudo isso a partir de um protótipo criado no figma.

Para iniciar o nosso front-end o primeiro passo é acessar a nossa pasta client: 

```bash
$ cd client
```

Em seguida já podemos inicializar o projeto:

```bash
$ npm run dev
```

### Executando a aplicação

Agora com a aplicação configurada é possível acessar a mesma através da seguintes URL :

Front-end
- http://localhost:5173/

Back-end
- http://localhost:3000/

Banco de dados
- http://localhost:5432/
