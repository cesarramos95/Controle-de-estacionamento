const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({ error: 'Token não infomado!' }); // 401 é erro de autorização

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).json({ error: 'Erro de token"' });

    const [ scheme, token] = parts; // Desestruturação para verificar se o token se inicia com
                                    // a palavra Bearer 
    if(!/^Bearer$/i.test(scheme)) // Regex que verifica se possui Bearer no inicio
        return res.status(401).json({ error: 'Token malformatado!' });

    jwt.verify(token, authConfig.secret, (err, decoded) => { // Callback
        if(err) return res.status(401).json({ error: 'Token inválido' })

        req.userId = decoded.id; // decoded.id é o id passado como parâmetro em authController
        return next();
    });    
};