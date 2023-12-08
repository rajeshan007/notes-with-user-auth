const {mongoose} = require("mongoose")
const {Schema, model} = mongoose

const noteSchmea = new Schema({
    title:String,
    body :String,
    userId : {
        type:Schema.Types.ObjectId,
        ref : "User"
    }
}, {timeStamps :true})

const Note = model("Note", noteSchmea)

module.exports = Note