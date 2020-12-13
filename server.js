const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
var path = require('path');

dotenv.config()

var PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())
app.use(cors())

const uri = process.env.MongoURI;

mongoose.connect(uri,{useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true})

var connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Monogdb Connect Successfully")
})

app.use(express.static('public'))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

const userAccountRoutes = require('./model/routes/userAccount');
const userTodoListRouter = require('./model/routes/userTodoList');

app.use('/userAccount',userAccountRoutes)
app.use('/userTodoList',userTodoListRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('public'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname+'/public/index.html'))
    })
}
