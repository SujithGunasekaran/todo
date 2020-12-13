const router = require('express').Router();
const userTodoList = require('../userTodoListModel')

/* add user todoList */

router.route('/add/UserTodoList').post((req,res)=>{
    const username = req.body.username;
    const id = req.body.id;
    const listinfo = req.body.info;
    const completed = req.body.completed;
    const todoList = new userTodoList({ username,id,listinfo,completed })
    todoList.save()
    .then(()=>{
        res.status(200).send()
    })
    .catch(()=>{
        res.status(404).send()
    })
})

/* update user todo List */

router.route('/update/UserTodoList').post((req,res) =>{
    const username = req.body.username;
    const id = req.body.id;
    const listinfo = req.body.info;
    const completed = req.body.completed;
    userTodoList.findOneAndUpdate({ username : username, id : id },{ $set : { listinfo : listinfo, completed : completed } }, { new : true } )
    .then(()=>{
        res.status(200).send()
    })
    .catch(()=>{
        res.status(404).send()
    })
})

/* get user todo list */

router.route('/get/TodoList').post((req,res) =>{
    const username = req.body.username;
    userTodoList.find({ username : username })
    .then((user) => {
        if(user){
            res.status(200).json(user).send()
        }
        else{
            res.status(404).send()
        }
    })
    .catch(()=>{
        res.status(404).send()
    })
})


/* delete user todo list */

router.route('/delete/UserTodoList').post((req,res) =>{

    userTodoList.findOneAndDelete({ username : req.body.username, id : req.body.id })
    .then(()=>{
        res.status(200).send()
    })
    .catch(()=>{
        res.status(404).send()
    })

})

module.exports = router