'use strict';

var mongoose = require('mongoose');
var dotenv = require("dotenv")
dotenv.config();

var app = require('./app');
var PORT = process.env.PORT || 5000;
var mongoUri = 'mongodb+srv://admin:admin@proyecto.ii5axio.mongodb.net/';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión establecida con éxito");

    // Creación del servidor
    app.listen(PORT, () => {
        console.log(`Servidor en ejecución en el puerto: ${PORT}`);
    });
})
.catch(err => console.log(err));
