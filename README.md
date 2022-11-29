# Note App API
## The Simple Note App

[![CircleCI](https://circleci.com/gh/bobo-the-dev/note-app-api.svg?style=shield)](https://github.com/bobo-the-dev/note-app-api)

## Features

- CRUD The Note

## Tech

- [Node.js](https://nodejs.org/) - v18.12.1
- [ExpressJS](https://expressjs.com/) - v4.18.2
- [Node-MySQL2](https://github.com/sidorares/node-mysql2) - v2.3.3
- [Sequelize](https://sequelize.org/) - v6.25.8


## Installation (via Node.JS)

Requires (mandatory)
- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

Install the dependencies and start the server.

```sh
git clone https://github.com/bobo-the-dev/note-app-api.git
cd note-app-api
npm install
npm run watch
```
Verify the app by navigate to

```sh
localhost:3000
```

## Installation (via Docker)

Requires (mandatory)
- [Docker](https://www.docker.com/)


Run the Docker command

```sh
docker run -d -p 3000:3000 -t bobothedev/note-app-api:0.0.1
```
Verify the app by navigate to

```sh
localhost:3000
```
## License

MIT


