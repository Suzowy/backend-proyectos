'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var dotenv = require('dotenv');
dotenv.config();
var cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.get('/', (req, res) => {
  res.send(`Bienvenido a ${process.env.TITLE}`);
});

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

  .catch(err => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); // Salir del proceso si hay un error crítico
  });


//   var mongoose = require('mongoose');
// var app = require('./app');
// var port = 3700;

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb+srv://admin:admin@proyecto.ii5axio.mongodb.net/')
// .then(()=>{
//     console.log("conexion establecida con exito");

//     //creaccion servidor

//     app.listen(port, ()=> {
//         console.log("servivor corriendo correctamente en la url:localhost:3700");
//     })
// })
// .catch(err => console.log(err));


