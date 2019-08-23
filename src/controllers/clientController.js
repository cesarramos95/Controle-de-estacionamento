// Rota para criar o cadastro de clientes do estacionamento
const express = require('express');

const Client = require('../models/client');

const router = express.Router();

router.post('/register', async (req, res) => { // Rota para cadastro
    try {
        const client = await Client.create(req.body);
        return res.json({ client }); //Prefira usar res.json() em vez do res.send(). O res.json() já configura toda response como Json

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.get('/search', async (req, res) => { // Rota para buscar
    try {
        const client = await Client.find({ licensePlate: req.body.licensePlate });

        return res.json({ client }); 

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.patch('/update', async (req, res) => { // Rota para atualizar
   
    
    try {
        const client = await Client.updateOne({ licensePlate: req.body.licensePlate }, {
            $set: { 
                "name": req.body.name,
                "tel" : req.body.tel,
                "carModel" : req.body.carModel,
                //"licensePlate" : req.params.licensePlate
                     }
        });

        return res.json({ client }); 

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); 
    }
});

router.delete('/delete', async (req, res) => { // Rota para deletar
    try {
        const client = await Client.deleteOne({ licensePlate: req.body.licensePlate });

        return res.json({ client }); 

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); 
    }
});



module.exports = (app) => app.use('/client', router);