var express = require('express');
var session = require('express-session');
const Product = require('../models/products');

//create router object
var router = express.Router();


router.get('/', async function(req,res){
    if (req.session.user){
            // products: [
        //     {name: 'Table', price: 100, quantity: 10},
        //     {name: 'Chair', price: 50, quantity: 20},
        //     {name: 'Bed', price: 200, quantity: 5}
        // ]
        products= await Product.find({});

        ctx={
            title: 'Tablemart',
            products: products,
            user: req.session.user
        } 
       // console.log(req.session.user);
        res.render('product/home',ctx);
    }else{
        res.redirect('/authentication')
    }

});


router.get('/about',function(req,res){
    ctx={
        title: 'Tablemart',
    };
    res.render('product/about',ctx);

});

router.get('/admin', async function(req,res){
    if (req.session.user){
        if (req.session.user.type=="admin"){
            products= await Product.find({});
            ctx={
                title: 'Tablemart',
                products: products,
                user: req.session.user
            };
            res.render('product/admin',ctx);
        }else{
            res.redirect('/');
        }
       
    }else{
        res.redirect('/authentication');
    }
   
});

router.post('/create-product',async function(req,res){
    //read the form data
    name=req.body.name;
    description=req.body.description;
    price=req.body.price;
    stock=req.body.stock;
    category=req.body.category;
    img_url=req.body.img_url;

    //create a new product
    new_product=new Product({
        name: name,
        description: description,
        price: price,
        stock: stock,
        category: category,
        imgUrl: img_url
    });

    //save the product
    await new_product.save();
    res.redirect('/product/admin');
    
});

router.get('/delete/:id',async function(req,res){
    id=req.params.id;
    await Product.deleteOne({_id: id});
    res.redirect('/product/admin');
});

router.get('/update-product/:id',async function(req,res){
    id=req.params.id;
    product=await Product.findOne({_id: id});
    ctx={
        title: 'Tablemart',
        product: product
    };
    res.render('product/update',ctx);

});

router.post('/update-product/:id',async function(req,res){
    data={  
        id:req.params.id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        stock:req.body.stock,
        category:req.body.category,
        imgUrl:req.body.img_url,
    }

    product=await Product.findByIdAndUpdate(id,data);
    res.redirect('/product/admin');

});

module.exports=router;