"use strict"

var mongoose = require('mongoose');
require('dotenv').config();

var app = require('./app');
var PORT = process.env.PORT || 5000;
var mongoUri = process.env.MONGO_DB_URI ;

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://backend-demo:DMRyETF8CzjEF05rBxj8SIKCN2hyC1mQineQsqZVXbJMs5SKLfM1ameYPTkdrgC3GokSfROheZtdACDbHHp0LA==@backend-demo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@backend-demo@", function (err, db) {
  db.close();
});


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