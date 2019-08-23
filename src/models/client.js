const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    tel: {
        type: String,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
    },
}, { timestamps: true }); // <- use isto

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;