"use strict"

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProjectSchema = Schema({
    name: "string",
    description: "string",
    category: "string",
    year: Number,
    langs: "string",
    image: "string",
    http: "string"
});

module.exports = mongoose.model("Project", ProjectSchema);
//projects --> guarda los documentos en la coleccion


