const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    /* Use o 'timestamps', esse flag faz com que o mongoose gerencie datas de criação e modificação */
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
}, { timestamps: true }); // <- use isto

const User = mongoose.model('User', UserSchema);

module.exports = User;