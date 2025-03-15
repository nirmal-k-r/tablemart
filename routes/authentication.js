var express = require('express');
var session = require('express-session');
const User = require('../models/users');
var bcrypt= require('bcrypt');

//create router object
var router = express.Router();


router.get('/', async function(req,res){
    ctx={
        title: 'Tablemart',
        user: req.session.user
    } 
    res.render('authentication/login',ctx);
});

router.post('/login', async function(req,res){
    username=req.body.username;
    pwd=req.body.password;

    const user_record=await User.findOne({
        username: username
    });

    if (user_record!=null){
        if (bcrypt.compareSync(pwd,user_record.password)){
            //console.log(user_record);
            const {
                password,
                ...myUser
            }=user_record._doc;
            req.session.user=myUser;
            req.session.cart=[];

            res.redirect("/");
        }else{
            res.redirect("/authentication");
        }
    }else{
        res.redirect("/authentication");
    }
});

router.get('/register', async function(req,res){
    ctx={
        title: 'Tablemart'
    } 
    res.render('authentication/register',ctx);

});

router.post('/register', async function(req,res){
    username=req.body.username;
    pwd=req.body.password;
    fullName=req.body.fullname;
    address=req.body.address;

    const hashedPassword=bcrypt.hashSync(pwd,10);
    const token=hashedPassword+String(Date.now());

    const data={
        username: username,
        password: hashedPassword,
        fullName: fullName,
        address: address,
        type:"user",
        token: token
    }
    newUser=new User(data);
    const createdUser= await newUser.save();
    console.log(createdUser);

    const {
        password,
        ...myUser
    }=data;

    req.session.user=myUser;
    req.session.cart=[];

    console.log(req.session.user);

    if (req.session.user){
        res.redirect('/product');
    }else{
        res.redirect('/authentication/register?message=Error')
    }
});

router.get("/logout",function (req,res){
    req.session.destroy();
    res.redirect('/authentication')
});


module.exports=router;