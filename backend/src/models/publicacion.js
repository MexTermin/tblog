const {Schema, model} = require('mongoose');
const uuidv4 = require("uuid/v4");

let idUnique = uuidv4();

const publicationSchema = new Schema({
   descripción:{type: String},
   imagen:{type: String, default:idUnique},
   id_usuario:{type: String, required: true},
   likes:{type: String, required: true}
})

module.exports = model('Publications', publicationSchema)
