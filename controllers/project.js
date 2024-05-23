"use strict";

let Project = require("../models/project");
let fs = require('fs');
let path = require('path');
var cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



let controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: "soy la home"
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: "soy el metodo o accion test del controlador de project"
        });
    },

    saveProject: function (req, res) {
        let project = new Project();

        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        project.http = params.http;

        project.save().then((projectStored) => {
            return res.status(200).send({
                message: "proyecto guardado",
                project: projectStored,
            });
        })
        .catch((error) => {
            return res.status(500).send({ error: "Error al guardar el proyecto" });
        });
    },

    getProject: async function(req, res) {
        try {
            var projectId = req.params.id;

            if (projectId == null) {
                return res.status(404).send({
                    message: "No se ha introducido ningún parámetro en la url."
                });
            }

            const projectFound = await Project.findById(projectId);

            if (!projectFound) {
                return res.status(404).send({
                    message: "El proyecto no existe."
                });
            }

            return res.status(200).send({
                project: projectFound
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error al devolver los datos."
            });
        }
    },
    
    getProjects: function (req, res) {
        Project.find({}).sort('-year').then((projects) => {
            if (!projects) return res.status(404).send({ message: "No hay proyectos que mostrar..." });
            return res.status(200).send({
                message: "Proyectos",
                projects
            });
        }).catch((err) => {
            if (err) return res.status(500).send({ message: "Error al devolver los datos" });
        });
    },

    updateProject: function (req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true })
            .then((projectUpdated) => {
                return res.status(200).send({
                    project: projectUpdated
                });
            })
            .catch(() => {
                return res.status(404).send({ message: "Proyecto no encontrado para actualizar." });
            });
    },

    deleteProject: function (req, res) {
        let projectId = req.params.id;

        Project.findByIdAndDelete(projectId)
            .then((projectRemoved) => {
                return res.status(200).send({
                    project: projectRemoved
                });
            })
            .catch((err, projectRemoved) => {
                if (err) return res.status(500).send({ message: 'No se pudo eliminar el proyecto.' });

                if (!projectRemoved) return res.status(404).send({ message: 'No se pudo encontrar el proyecto para ser eliminado.' });
            });
    },

    uploadImage: async function (req, res) {
        try {
            const projectId = req.params.id;

            if (req.file) {
                const image = req.file.path;

                // Subir la imagen a Cloudinary en la carpeta 'proyectos'
                const result = await cloudinary.uploader.upload(image, {
                    folder: 'proyectos'
                });

                // Eliminar el archivo local después de subirlo a Cloudinary
                fs.unlinkSync(image);

                // Actualizar la imagen del proyecto con la URL de Cloudinary
                const updateImage = await Project.findByIdAndUpdate(
                    projectId,
                    { image: result.secure_url },
                    { new: true }
                );

                if (updateImage) {
                    return res.status(200).send({
                        files: result.secure_url,
                        message: 'La imagen se ha subido con éxito'
                    });
                } else {
                    return res.status(404).send({
                        message: 'No se ha encontrado el proyecto'
                    });
                }
            } else {
                return res.status(200).send({
                    message: 'Imagen no subida'
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error al subir la imagen' });
        }
    },

    getImageFile: function (req, res) {
        let file = req.params.image;
        let path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }
};

module.exports = controller;