const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userTodoListSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    id : {
        type : String,
        required : true
    },
    listinfo : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        required : true
    }
})


const userTodoList = mongoose.model('userTodoList',userTodoListSchema)
module.exports = userTodoList;