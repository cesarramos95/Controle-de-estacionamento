//O arquivo de ponto de entrada da aplicação deve ficar na raiz do projeto
const express = require('express');
const mongoose = require('mongoose'); // <- temos que importar o mongoose aqui para que possamos fazer a conexão com o BD
// const bodyParser = require('body-parser'); // <- não vamos precisar desse módulo (removi do package.json também)

const DB = require('./src/database'); // <- importamos as configurações do BD para passar pro mongoose

const app = express(); // Criando a aplicação

app.use(express.json());

mongoose.connect(DB.DB_URL, DB.DB_SETTINGS,
    function(error) { //Essa função roda sempre que a aplicação se conecta no Mongo, isto é um tipo de função chamada 'callback'
        if (!error) {
            console.log(`Conectado no MongoDB`);
        } else {
            console.log(`Erro ao conectar ao MongoDB.\nErro => ${error}`);
        }
    }
);

require('./src/controllers/userController')(app); // app é passado pois é usado em toda a aplicação
require('./src/controllers/clientController')(app); // Para registrar informações do cliente

app.listen(3000, 
    function() { //Essa função roda sempre que servidor subir, isto também é um 'callback'
        console.log(`Aplicação rodando.`);
    }
);