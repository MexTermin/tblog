const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    nombre:{ type: String, required: true},
    apellido:{ type: String, required: true},
    email:{ type: String, required: true},
    contraseña:{ type: String, required: true},
    descripcion:{type: String, required: true},
    imagen:{type: String},
    created_at:{ type: Date, default: Date.now}

})

module.exports = model('User', userSchema)
