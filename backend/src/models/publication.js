const {Schema, model} = require('mongoose');
const uuidv4 = require("uuid/v4");

let idUnique = uuidv4();

const publicationSchema = new Schema({
   description:{type: String},
   image:{type: String, default:idUnique},
   user_id:{type: String, required: true},
   likes:{type: Number, required: true},
   createdAt:{ type: Date, default: Date.now}
})

module.exports = model('Publication', publicationSchema)
