const router = require('express').Router()
const userAccount = require('../userAccountModel');
var salt = 10;
var bcrypt = require('bcrypt');

/* Signup APi */

router.route('/newUser/signup').post((req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const newUserInfo = new userAccount({username,password})
    userAccount.findOne({username : username}, async function(user,err){
        if(user){
            res.status(300).send("Already user exist")
        }
        else{
            const salt = await bcrypt.genSalt(10)
            newUserInfo.password = await bcrypt.hash(newUserInfo.password,salt)
            await newUserInfo.save()
            .then(()=>{
                res.status(200).send()
                console.log("Added successfully")
            })
            .catch((err) => res.status(404).send())
        }
    })
})

/* Login API */

router.route('/User/Login').post((req,res)=>{
    const username = req.body.username;
    userAccount.findOne({ username : username })
    .then((user)=>{
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err,result){
                if(result === true){
                    res.status(200).json(user).send()
                }
                else{
                    res.status(404).send("Password incorrect")
                }
            })
        }
        else{
            res.status(404).send()
        }
    })
    .catch(()=>{
        res.status(404).send()
    })

})

/* Forgot password username check */

router.route('/User/checkUsername').post((req,res) =>{  
    const username = req.body.username;
    userAccount.findOne({ username : username })
    .then((user)=>{
        if(user){
            res.status(200).send()
        }
        else{
            res.status(404).send()
        }
    })
    .catch(()=>{
        res.status(404).send()
    })
})

/* password Update API */

router.route('/User/passwordReset').post((req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    userAccount.findOne({ username : username })
    .then(async(user) =>{
        if(user){
            const salt = await bcrypt.genSalt(10)
            encryptPassword = await bcrypt.hash(password,salt)
            userAccount.findOneAndUpdate({ username : username }, { $set : { password : encryptPassword } }, { new : true } )
            .then(() => {
                res.status(200).send()
            })
            .catch(() => {
                console.log("error")
                res.status(404).send()
            })
        }
        else{
            res.status(404).send()
        }
    })
    .catch(()=>{
        res.status(404).send()
    })    
})

module.exports = router