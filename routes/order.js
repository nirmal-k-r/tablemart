var express = require('express');
var session = require('express-session');
const Product = require('../models/products');

//create router object
var router = express.Router();


router.get('/cart', async function(req,res){
    if (req.session.user){
        cart=[];
        totalPrice=0;

        for (itemId of req.session.cart){
            //console.log(itemId);

            product=await Product.findOne({_id: itemId});
            cart.push(await product);
            totalPrice=totalPrice+product.price;
        }

        ctx={
            title: 'Tablemart',
            cart:cart,
            user: req.session.user,
            totalPrice:totalPrice
        } 

        res.render('order/cart',ctx);
    }else{
        res.redirect('/authentication')
    }
});


router.get('/cart/add/:id',async function(req,res){
    if (req.session.user){
        id=req.params.id;
        req.session.cart.push(id);
        res.redirect('/order/cart');
        
    }else{
        res.redirect('/authentication')
    }

});

router.get('/cart/delete/:id',async function(req,res){
    if (req.session.user){
        id=req.params.id;
        console.log("deleting"+id);
        //delete item from array
        
        new_cart=[];
        for (itemId of req.session.cart){
            if (itemId!=id){
                new_cart.push(itemId);
            }
        }
        req.session.cart=new_cart;
        // console.log(new_cart);
        
        res.redirect('/order/cart');
    }else{
        res.redirect('/authentication')
    }
});



module.exports=router;
