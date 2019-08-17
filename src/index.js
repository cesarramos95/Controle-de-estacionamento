const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // Criando a aplicação

app.use(express.json());

require('./controllers/authController')(app); // app é passado pois é usado em toda a aplicação

app.listen(3000);