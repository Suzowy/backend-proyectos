'use strict';

var mongoose = require('mongoose');
require('dotenv').config();

var app = require('./app');
var PORT = 3700;
var mongoUri = 'mongodb+srv://admin:admin@proyecto.ii5axio.mongodb.net/'; 

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión establecida con éxito");

    // Creación del servidor
    app.listen(PORT, () => {
        console.log(`URL del servidor: http://localhost:${PORT}`);
    });
})
.catch(err => console.log(err));
