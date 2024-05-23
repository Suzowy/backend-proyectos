"use strict"

var express = require('express');
const fileUpload = require('express-fileupload');
var app = express();

//archivos de rutas
let project_routes = require("./routes/project");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
    useTempFiles :true,
    tempFileDir : './uploads'
}));


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use("/api", project_routes)

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Error de Multer
      res.status(400).send({ error: 'Error de carga de archivo' });
    } else {
      // Otro tipo de error
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  });

//exportar
module.exports = app;
