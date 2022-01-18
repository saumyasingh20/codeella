const express = require('express');
const app = express();
const port = 8002;

const expressLayouts = require ('express-ejs-layouts');
//use the express ejs layouts library
app.use(expressLayouts);

//use the static files

app.use(express.static('./assets'));

//use express router
app.use('/',require('./routes'));

//extract styles and scripts from the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting the view engine as ejs and views folder
app.set('view engine','ejs');
app.set('views','./views');

//run server on port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});