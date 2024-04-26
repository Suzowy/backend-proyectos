'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var dotenv = require('dotenv');
dotenv.config();

// Conectar a MongoDB
var mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri)
  .then(() => {
    console.log("Conexión establecida con éxito");

    // Iniciar el servidor
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor en ejecución en el puerto: ${process.env.PORT || 5000}`);
    });
  })

.get('/', (req, res) => {
  res.send(`${process.env.TITLE}`)
})


  .catch(err => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); // Salir del proceso si hay un error crítico
  });
