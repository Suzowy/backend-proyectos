"use strict"

let express = require("express");
let ProjectControler = require("../controllers/project");

let router = express.Router();

let multipart = require("connect-multiparty");
let multipartMiddelware = multipart({uploadDir: "./uploads"});

router.get("/home", ProjectControler.home);
router.post("/test", ProjectControler.test);
router.post("/save-project", ProjectControler.saveProject);
router.get("/project/:id?", ProjectControler.getProject);
router.get("/projects", ProjectControler.getProjects);
router.put("/project/:id", ProjectControler.updateProject);
router.delete("/project/:id", ProjectControler.deleteProject);
router.post("/upload-image/:id",multipartMiddelware, ProjectControler.uploadImage);
router.get("/get-image/:image", ProjectControler.getImageFile);
module.exports = router;


