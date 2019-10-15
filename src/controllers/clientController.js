// Rota para criar o cadastro de clientes do estacionamento
const express = require('express');

const Client = require('../models/client');

const router = express.Router();

router.post('/', async (req, res) => { // Rota para cadastro
    const { licensePlate } = req.body;  
    try {
        if(await Client.findOne({ licensePlate }))  // Impossibilita cadastrar dois clientes com a mesma placa        
            return res.status(400).json({ error: 'Placa já cadastrada anteriormente!' });

        const client = await Client.create(req.body);

        return res.json({ client }); //O res.json() já configura toda response como Json

    } catch (err) {
        return res.status(400).json({ msg: 'O registro falhou!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.get('/:licensePlate?', async (req, res) => { // Rota para buscar
    try {
        let licensePlate = req.params.licensePlate;
        let client = {};

        if(!licensePlate) {
            //find all
            client = await Client.find();
        } else {
            //find one
            client = await Client.find({licensePlate});
        }

        return res.json({ client }); 

    } catch (err) {
        return res.status(400).json({ msg: 'Informação de cliente não encontrada!', error: err }); //Devolva o erro na response, isso facilita descobrir a causa
    }
});

router.patch('/', async (req, res) => { // Rota para atualizar
   
    
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
        return res.status(400).json({ msg: 'Erro ao atualizar! Tente novamente.', error: err }); 
    }
});

router.delete('/:licensePlate', async (req, res) => { // Rota para deletar
    try {
        await Client.findOneAndDelete( req.params.licensePlate );

        return res.json(); 

    } catch (err) {
        return res.status(400).json({ msg: 'Erro ao excluir informações!', error: err }); 
    }
});



module.exports = (app) => app.use('/client', router);