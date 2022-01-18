const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeella_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to the database"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports= db;