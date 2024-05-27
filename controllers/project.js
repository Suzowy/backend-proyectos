"use strict";

const Project = require("../models/project");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: "Soy la home"
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el método o acción test del controlador de project"
        });
    },

    saveProject: function (req, res) {
        const project = new Project(req.body);

        project.save()
        .then((projectStored) => {
            return res.status(200).send({
                message: "Proyecto guardado",
                project: projectStored,
            });
        })
        .catch((error) => {
            return res.status(500).send({ error: "Error al guardar el proyecto" });
        });
    },

    getProject: async function(req, res) {
        try {
            const projectId = req.params.id;
            if (!projectId) {
                return res.status(404).send({
                    message: "No se ha introducido ningún parámetro en la URL."
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
            return res.status(500).send({
                message: "Error al devolver los datos."
            });
        }
    },
    
    getProjects: function (req, res) {
        Project.find({}).sort('-year')
        .then((projects) => {
            return res.status(200).send({
                message: "Proyectos ",
                projects
            });
        })
        .catch(() => {
            return res.status(500).send({ message: "Error al devolver los datos" });
        });
    },

    updateProject: function (req, res) {
        const projectId = req.params.id;
        const update = req.body;

        Project.findByIdAndUpdate(projectId, update)
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
        const projectId = req.params.id;
        Project.findByIdAndDelete(projectId)
        .then((projectRemoved) => {
            return res.status(200).send({
                project: projectRemoved
            });
        })
        .catch(() => {
            return res.status(500).send({ message: 'No se pudo eliminar el proyecto.' });
        });
    },

    uploadImage: async function (req, res) {
        try {
            const projectId = req.params.id;
            if (!req.files || !req.files.image) {
                return res.status(400).send({
                    message: 'No se ha recibido ninguna imagen'
                });
            }
            const filePath = req.files.image.path;
            cloudinary.uploader.upload(filePath,{ folder: 'proyectos' }, async function(error, result) {
                if (error) {
                    return res.status(500).send({ message: 'Error al subir la imagen a Cloudinary' });
                }
                const imageId = result.public_id;
                const updateProject = await Project.findByIdAndUpdate(
                    projectId,
                    { image: imageId },
                    { new: true }
                );
                if (updateProject) {
                    return res.status(200).send({
                        imageId: imageId,
                        message: 'El archivo se ha subido con éxito a Cloudinary'
                    });
                } else {
                    return res.status(404).send({
                        message: 'No se ha encontrado el proyecto'
                    });
                }
            });
        } catch (error) {
            return res.status(500).send({ message: 'Error al llamar al método uploadImage' });
        }
    },

    getImageFile: async function (req, res) {
        try {
            const imageId = req.params.image;
            const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
            return res.status(200).send({
                imageUrl: imageUrl,
                message: 'Imagen encontrada'
            });
        } catch (error) {
            return res.status(500).send({
                message: 'Error al obtener la imagen'
            });
        }
    }
};

module.exports = controller;
