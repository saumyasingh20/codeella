const express = require('express');
const app = express();
const port = 8002;

//use express router
app.use('/',require('./routes'));


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