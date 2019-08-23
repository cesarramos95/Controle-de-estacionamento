// const mongoose = require('../database'); // <- esta linha está errada, ela faz referêcia à ela mesmo

const DB_URL = 'mongodb://localhost:27017/controleestacionamento';

const DB_SETTINGS = { //Este objeto vai armazenar todas as configurações do BD
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    user: '',
    pass: '',
    dbName: 'controleestacionamento'
}

//mongoose.connect('mongodb://localhost/controleestacionamento', DB_SETTINGS); // <- a conexão com o Mongo será feita quando a aplicação subir (lá no index.js). Faltou colocar o número da porta onde o seu mongo está rodando (o padrão é 27017).
// mongoose.Promise = global.Promise; // <- não precisamos desta linha

module.exports = { //Vamos expor a URL do BD e as configurações
    DB_URL,
    DB_SETTINGS
}