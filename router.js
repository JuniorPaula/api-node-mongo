/** iniciar as rotas */
const express = require('express');

/** importar o Router */
const route = express.Router();

/** importar os controllers */
const UserController = require('./src/controllers/UserController');
const LoginController = require('./src/controllers/LoginController');

const { checkToken } = require('./src/middlewares/middleware');

/** rotas de login */
route.post('/auth/login', LoginController.login);

/** rotas usuários */
route.get('/user', UserController.index);
route.post('/user', UserController.create);
route.get('/user/:id', checkToken, UserController.show);
route.put('/user/:id', UserController.update);
route.delete('/user/:id', UserController.delete);

/** exportar as rotas */
module.exports = route;
