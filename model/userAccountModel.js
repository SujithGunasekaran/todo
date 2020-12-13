const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountTodoSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const userAccountTodo = mongoose.model('userAccountTodo', userAccountTodoSchema)
module.exports = userAccountTodo;