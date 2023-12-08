const mongoose = require('mongoose')
const {Schema,model} = mongoose 


const userSchema  = new Schema({
    userName : String,
    email:String,
    password :String,
    
    
}, {timestamps:true})


const User = model("User", userSchema)
module.exports = User