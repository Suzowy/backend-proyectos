"use strict";
require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//archivos de rutas
let project_routes = require("./routes/project");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use("/api", project_routes);

// Variables
var PORT = process.env.PORT || 3700;
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

//exportar
module.exports = app;
