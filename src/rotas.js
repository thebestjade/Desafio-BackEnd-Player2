const express = require('express');
const rotas = express();
const usuarios = require('./controladores/usuarios');
const empresas = require('./controladores/empresas');


rotas.post('/cadastrarUsuario', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

rotas.post('/cadastrarEmpresa', empresas.cadastrarEmpresa);
rotas.post('/listarEmpresas', empresas.listarEmpresas);
rotas.post('/editarEmpresa', empresas.EditarEmpresa);
rotas.post('/excluirEmpresa', empresas.ExcluirEmpresa);


module.exports = rotas;