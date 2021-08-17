const express = require('express');
const usuarios = require('./controladores/usuarios');
const empresas = require('./controladores/empresas');
const validarToken = require('./filtros/validarToken');
const rotas = express();


rotas.post('/cadastrarUsuario', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

rotas.use(validarToken);

rotas.post('/cadastrarEmpresa', empresas.cadastrarEmpresa);
rotas.get('/listarEmpresas', empresas.listarEmpresas);
rotas.put('/editarEmpresa/:idEmpresa', empresas.editarEmpresa);
rotas.delete('/excluirEmpresa/:idEmpresa', empresas.excluirEmpresa);


module.exports = rotas;