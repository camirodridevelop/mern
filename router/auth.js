const express = require('express');
const AuthController = require('../controllers/auth')

const api = express.Router();

//rutas
api.post('/auth/register', AuthController.register);
api.post("/auth/login", AuthController.login);


module.exports = api;

//en el router se ejecutan los controladores