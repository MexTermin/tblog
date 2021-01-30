const {Schema, model} = require('mongoose');
const uuidv4 = require("uuid/v4");

let idUnique = uuidv4();

const userSchema = new Schema({
    nombre:{ type: String, required: true},
    apellido:{ type: String, required: true},
    email:{ type: String, required: true},
    contraseña:{ type: String, required: true},
    descripcion:{type: String, },
    imagen:{type: String, default: idUnique},
    created_at:{ type: Date, default: Date.now}

})

module.exports = model('User', userSchema)
