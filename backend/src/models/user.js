const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt-node')
const {v4: uuidv4 } = require('uuid')

const userSchema = new Schema({
    username: {type: String, required: true},
    email:{ type: String, required: true},
    password:{ type: String, required: true},
    description:{type: JSON},
    image:{type: JSON},
    createdAt:{ type: Date, default: Date.now}

})

module.exports = model('users', userSchema)
