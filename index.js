const express = require('express');
const app = express();
const port = 8002;

//use express router
app.use('/',require('./routes'));


//seeting the view engine as ejs and views folder
app.set('view engine','ejs');
app.set('view','./views');

//run server on port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});