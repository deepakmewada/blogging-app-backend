const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    roles: {
        type: String,
        required: false,
    },
},{timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

module.exports = mongoose.model('Users', userSchema)