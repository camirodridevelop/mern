const express = require("express");
const movieController = require ("../controllers/movie");

const api = express.Router();

const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir:"./uploads/movie"});

//rutas
api.post("/movie",[md_upload], movieController.createMovie);

module.exports = api;