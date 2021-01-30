const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
   id_publicacion:{type: String, required: true},
   id_usuario:{type: String, required: true},
   descripcion:{type: String}
})

module.exports = model('Comments', commentSchema)
