const {Schema, model} = require('mongoose');
const uuidv4 = require("uuid/v4");

let idUnique = uuidv4();

const userSchema = new Schema({
    name:{ type: String, required: true},
    lastName:{ type: String, required: true},
    email:{ type: String, required: true},
    password:{ type: String, required: true},
    description:{type: String, },
    image:{type: String, default: idUnique},
    createdAt:{ type: Date, default: Date.now}

})

module.exports = model('User', userSchema)
