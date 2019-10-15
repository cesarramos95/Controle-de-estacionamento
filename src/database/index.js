// const mongoose = require('../database'); // <- esta linha está errada, ela faz referêcia à ela mesmo
const cors = require('cors');
const express = require('express');

const app = express();

const DB_URL = 'mongodb://localhost:27017/controleestacionamento';


const DB_SETTINGS = { //Este objeto vai armazenar todas as configurações do BD
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    user: '',
    pass: '',
    dbName: 'controleestacionamento'
}

app.use(cors({ origin: 'http://localhost:3000' }))
module.exports = { //Vamos expor a URL do BD e as configurações
    DB_URL,
    DB_SETTINGS
}