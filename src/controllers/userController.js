// Controle de autenticação do login do funcionário do estacionamento
const express = require('express');
const bcrypt = require('bcryptjs');    // Biblioteca usada para criptografar a senha através de hash
const jwt = require('jsonwebtoken');  

/* Controller do projeto que garante que o usuário
  esteja logado no sistema para fazer as requisições */
const authMiddleware = require('../middlewares/auth'); 

const authConfig = require('../config/auth'); // Importa a informação de token de auth.json

const User = require('../models/user');

const router = express.Router();

router.use(authMiddleware); // adicionadas agora

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d', // valor em segundos, equivalente a 01 dia
    });
}

router.post('/', async (req, res) => { // Rota para cadastro
    const { email } = req.body;
    try {
        if(await User.findOne({ email }))
            return res.status(400).json({ error: 'Usuário com esse e-mail já cadastrado!' });

        const user = await User.create(req.body);
    
        return res.json({   // O res.json() já configura toda response como Json
            user
        });  

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.get('/:email?', async (req, res) => { // <- Rota para listar contas de funcionário específica ou todas 
    try {
        let email = req.params.email;
        let user = {};

        if(!email) {
            //find all
            user = await User.find();
        } else {
            //find one
            user = await User.find({email});
        }

        return res.json({ user }); 

    } catch (err) {
        return res.status(400).json({ msg: 'Informação de funcionário não encontrada!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.patch('/', async (req, res) => {
    try {
        const user = await User.update( {email: req.body.email}, {
            $set: {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
            }
        });

       return res.json({ user }); 

    } catch (err) {
        return res.status(400).json({ msg: 'Erro ao atualizar informações de cadastro! Tente novamente.', error: err });
    }
});

router.delete('/:_id', async (req, res) => { // Rota para deletar registro de funcionário
    try {
        await User.findOneAndDelete( req.params.id );
        
        return res.json(); // Retorna vazio se o usuário for excluído corretamente
        
    } catch (err) {
        return res.status(400).json({ msg: 'Erro ao excluir conta!', error: err }); 
    }
});

/* Implementação da função de autenticação com JWT (Json Web Tokken)
    Somente é necessário para o funcionário do estacionamento
*/
router.post('/authenticate', async (req, res) => {
    const { name, password} = req.body; // Será email e senha mesmo ou é melhor username e senha?
    
    const user = await User.findOne({ name }).select('+password'); // Verifica se o usuário existe no banco de dados

    if(!user)                                                                               // <- faz a verificação do login do funcionário                      
        return res.status(400).json({ error: 'Usuário ou senha inválidos! :( Tente novamente.' });      // Se o e-mail ou senha fornecidos estiverem errados            
                                                                                            // o login não acontece   
    if(!await bcrypt.compare(password, user.password))                                      
        return res.status(400).json({ error: 'Usuário ou senha inválidos! :( Tente novamente.' });

    res.json({ 
        //user, 
        token: generateToken({ id: user.id }), // Se não ocorrer nenhum erro, retorna com o usuário
    });
});

module.exports = (app) => app.use('/user', router);