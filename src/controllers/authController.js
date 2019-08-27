// Controle de autenticação do login do funcionário do estacionamento
const express = require('express');
const bcrypt = require('bcryptjs');    // Biblioteca usada para criptografar a senha através de hash
const jwt = require('jsonwebtoken');  

const authConfig = require('../config/auth'); // Importa a informação de token de auth.json

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // valor em segundos, equivalente a 01 dia
    });
}

router.post('/register', async (req, res) => { // Rota para cadastro
    const { email } = req.body;
    try {
        if(await User.findOne({ email }))
            return res.status(400).json({ error: 'Esse usuário já existe!' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.json({   // O res.json() já configura toda response como Json
            user,
            token: generateToken({ id: user.id }),
        });  

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.delete('/delete', async (req, res) => { // Rota para deletar
    try {
        const user = await User.deleteOne({ name: req.body.name });

        return res.json({ user }); 

    } catch (err) {
        return res.status(400).json({ msg: 'Erro ao excluir informações!', error: err }); 
    }
});

// Implementação da função de autenticação com JWT (Json Web Tokken)
router.post('/authenticate', async (req, res) => {
    const { name, password} = req.body; // Será email e senha mesmo ou é melhor username e senha?

    const user = await User.findOne({ name }).select('+password'); // Verifica se o usuário existe no banco de dados

    if(!user)                                                                               // <- faz a verificação do login do funcionário                      
        return res.status(400).json({ error: 'Usuário ou senha inválidos! :( Tente novamente.' });      // Se o e-mail ou senha fornecidos estiverem errados            
                                                                                            // o login não acontece   
    if(!await bcrypt.compare(password, user.password))                                      
        return res.status(400).json({ error: 'Usuário ou senha inválidos! :( Tente novamente.' });

    user.password =  undefined; // O servidor não retorna a senha no momento da autenticação
    
    res.json({ 
        user, 
        token: generateToken({ id: user.id }), // Se não ocorrer nenhum erro, retorna com o usuário
    });
});

module.exports = (app) => app.use('/auth', router);