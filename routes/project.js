"use strict"

let express = require("express");
let ProjectControler = require("../controllers/project");

const multer = require ('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, "upload" + Date.now() + file.originalname);
    }
  });

const upload =multer({
    storage:storage
});

let router = express.Router();


router.get("/home", ProjectControler.home);
router.post("/test", ProjectControler.test);
router.post("/save-project", ProjectControler.saveProject);
router.get("/project/:id?", ProjectControler.getProject);
router.get("/projects", ProjectControler.getProjects);
router.put("/project/:id", ProjectControler.updateProject);
router.delete("/project/:id", ProjectControler.deleteProject);
router.post("/upload-image/:id",upload.single('image'), ProjectControler.uploadImage);
router.get("/get-image/:image", ProjectControler.getImageFile);
module.exports = router;
