"use strict";

let express = require("express");
let ProjectController = require("../controllers/project");
let router = express.Router();

// let multer = require("multer");
let multipart = require("connect-multiparty");
let multipartMiddelware = multipart({ uploadDir: "../uploads" });


// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }

// });

//const upload = multer({ dest: '../uploads/' });

router.get("/home", ProjectController.home);
router.post("/test", ProjectController.test);
router.post("/save-project", ProjectController.saveProject);
router.get("/project/:id?", ProjectController.getProject);
router.get("/projects", ProjectController.getProjects);
router.put("/project/:id", ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);
router.post("/upload-image/:id",multipartMiddelware, ProjectController.uploadImage);
// router.post("/upload-image/:id", upload.single('image'), ProjectController.uploadImage);
router.get("/get-image/:image", ProjectController.getImageFile);

module.exports = router;
