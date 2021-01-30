const {Schema, model} = require('mongoose');
const uuidv4 = require("uuid/v4");

let idUnique = uuidv4();

const commentSchema = new Schema({
   id_publicacion:{type: String, required: true},
   id_usuario:{type: String, required: true},
   descripcion:{type: String, default: idUnique}
})

module.exports = model('Comments', commentSchema)
