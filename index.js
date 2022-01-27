const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8002;

const expressLayouts = require ('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//to store the session cookies in mongo db
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');

const customMware = require('./config/middleware');
app.use(sassMiddleware({

    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'


}));
//middleware to parse the requests
app.use(express.urlencoded());

//setting up the cookie parser
app.use(cookieParser());

//use the express ejs layouts library
app.use(expressLayouts);

//use the static files

app.use(express.static('./assets'));



//extract styles and scripts from the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting the view engine as ejs and views folder
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeella',
    //to do - change the secret before deployment in production mode
    secret:'blahsomethingxxx',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)
    },
    store: MongoStore.create(
        {
           mongoUrl: 'mongodb://localhost/codeella_development'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

//run server on port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});