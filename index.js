"use strict"

var mongoose = require('mongoose');
require('dotenv').config();

var app = require('./app');
var PORT = process.env.PORT || 5000;
var mongoUri = process.env.MONGO_DB_URI ;


mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("conexion establecida con exito");

    //creaccion servidor

    app.listen(PORT, ()=> {
        console.log(`Server URL: http://localhost:${PORT}`);
    })
})
.catch(err => console.log(err));