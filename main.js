//imports
var express=require('express');
var ejs=require('ejs');
var express_session=require('express-session');

product_routes=require('./routes/product');
admin_routes=require('./routes/admin');
order_routes=require('./routes/order');
authentication_routes=require('./routes/authentication');
const bodyParser = require('body-parser');


var db=require('./db');

//create server
var app=express();

app.use(bodyParser.urlencoded({ extended: true }));

//setup static files
static_path=__dirname+'/static';
app.use(express.static(static_path));

//setup template directory
template_path=__dirname+'/templates';
app.set('view engine','ejs');
app.set('views',template_path);

//middleware definition
var logger=function(req,res,next){
    console.log(`Received ${req.url} at ${new Date()}`);
    next();
};

//express-session middleware
app.use(express_session({
    secret: 'tyHGFEWdhw^&**(HBS5^&*dervhuc03HFUJ438',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000 //seconds
    }
}));


//use middleware
app.use(logger);

//initialise routers
app.use('/product',product_routes);
// app.use('/admin',admin_routes);
app.use('/order',order_routes);
app.use('/authentication',authentication_routes);


app.get('',function(req,res){
    res.redirect('/product')
});

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//start server
const port = process.env.PORT || 3000;
app.listen('0.0.0.0',port,function(){ //to set open ip addres
    console.log(`Server is listening on port ${port}`);
});