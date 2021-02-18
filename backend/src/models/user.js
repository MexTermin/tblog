const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    username: {type: String, required: true},
    email:{ type: String, required: true, unique:true},
    password:{ type: String, required: true},
    description:{type: JSON},
    image:{type: JSON},
    createdAt:{ type: Date, default: Date.now}

})

userSchema.pre('save', async function (next) { 
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
 })

 userSchema.methods.isValidPassword = async function (password, next) {  
     const user = this;
     const compare = await bcrypt.compare(password, user.password)
     return compare
 }
module.exports = model('users', userSchema)
