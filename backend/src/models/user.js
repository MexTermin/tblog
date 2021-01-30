const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

uuidv4();

const userSchema = new Schema({
    name:{ type: String, required: true},
    lastName:{ type: String, required: true},
    email:{ type: String, required: true},
    password:{ type: String, required: true},
    description:{type: String, },
    image:{type: String, default: uuidv4()},
    createdAt:{ type: Date, default: Date.now}

})

module.exports = model('User', userSchema)
