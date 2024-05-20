"use strict";

let express = require("express");
let ProjectControler = require("../controllers/project");

let router = express.Router();

let multipart = require("connect-multiparty");
let multipartMiddelware = multipart({ uploadDir: "./uploads/" });

// Importa el modelo de proyecto y otros módulos necesarios
const Project = require('../models/project');

// Ruta para obtener la URL de una imagen por su nombre
router.get("/image-url/:imageName", async (req, res) => {
    try {
        // Obtiene el nombre de la imagen de los parámetros de la solicitud
        const imageName = req.params.imageName;

        // Construye la URL de la imagen basada en el nombre de la imagen
        const imageUrl = `https://backend-proyectos-eq91.onrender.com/uploads/${imageName}`;

        // Envía la URL de la imagen como respuesta
        res.status(200).json({ imageUrl });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener la URL de la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get("/home", ProjectControler.home);
router.post("/test", ProjectControler.test);
router.post("/save-project", ProjectControler.saveProject);
router.get("/project/:id?", ProjectControler.getProject);
router.get("/projects", ProjectControler.getProjects);
router.put("/project/:id", ProjectControler.updateProject);
router.delete("/project/:id", ProjectControler.removeProject);
router.post("/upload-image/:id", multipartMiddelware, ProjectControler.uploadImage);
router.get("/get-image/:image", ProjectControler.getImageFile);
module.exports = router;