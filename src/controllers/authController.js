// Controle de autenticação do usuário do sistema 
const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => { // Rota para cadastro
    try {
        const user = await User.create(req.body);
        return res.json({ user }); //Prefira usar res.json() em vez do res.send(). O res.json() já configura toda response como Json

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

module.exports = (app) => app.use('/auth', router);