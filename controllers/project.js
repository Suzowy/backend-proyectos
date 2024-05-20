"use strict"

let Project = require("../models/project");
let fs = require('fs');
let path = require('path');

let controller = {
    home: function (req, res) {
        return res.status(200).send({
            menssaje: "soy la home"
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            messaje: "soy el metodo o accion test del controlador de project"
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

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el proyecto'});
        
            if(!projectStored) return res.status(404).send({message: 'No se pudo guardar el proyecto'});

            return res.status(200).send({project: projectStored});
        });

    },
    getProject: function(request,response){
        let projectId = request.params.id;

        if(projectId == null) return response.status(404).send({message: 'El proyecto no existe'});

        Project.findById(projectId, (err, project) => {
            if(err) return response.status(500).send({message: 'Error al devolver los datos'});

            if(!project) return response.status(404).send({message: 'El proyecto no existe'});

            return response.status(200).send({
                project
            });
        });
    },

    getProjects: function(req,res){

        Project.find({}).exec((err, projects) => {
            if(err) return response.status(500).send({message: 'Error al devolver los datos'});

            if(!projects) return res.status(404).send({message: 'No hay proyectos que mostrar'});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req,res){
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto'});

            return res.status(200).send({
                project: projectUpdated
            })
        })

    },

    removeProject: function(req,res){
        let projectId = req.params.id;

        Project.findByIdAndRemove(projectId,(err,projectRemoved) => {
            if(err) return res.status(500).send({message: 'Error al borrar'});

            if(!projectRemoved) return res.status(404).send({message: 'No se pudo borrar el proyecto'});

            return res.status(200).send({
                project: projectRemoved
            });
        });

    },



    uploadImage: function(req, res) {
        let projectId = req.params.id;
        let fileName = 'Imagen no subida...';
    
        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];
    
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                let imageName = fileName; // Nombre de la imagen guardada en la base de datos
                let imageUrl = `https://backend-proyectos-eq91.onrender.com/uploads/${imageName}`;
    
                Project.findByIdAndUpdate(projectId, { image: `uploads/${imageName}` }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'Error al actualizar' });
    
                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });
    
                    return res.status(200).send({
                        project: projectUpdated,
                        imageUrl: imageUrl // Agrega la URL de la imagen en la respuesta
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extension no valida' });
                });
            }
        } else {
            return res.status(404).send({
                message: fileName
            });
        }
    },

};

    

module.exports = controller;