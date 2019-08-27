/*Controller do projeto que garante que o usuário
  esteja logado no sistema para fazer as requisições */
const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.json({ ok: true, user: req.userId });
});

module.exports = app => app.use('/projects', router);