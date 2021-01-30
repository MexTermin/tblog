const {Schema, model} = require('mongoose');

const publicationSchema = new Schema({
   descripción:{type: String},
   imagen:{type: String},
   id_usuario:{type: String, required: true},
   likes:{type: String, required: true}
})

module.exports = model('Publications', publicationSchema)
