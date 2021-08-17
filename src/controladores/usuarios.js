const conexao = require('../conexao');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const segredo = require("../segredo_jwt");


const cadastrarUsuario = async (req, res) => {
  const {nome, data_nascimento, email, senha} = req.body;

  if(!nome){
    return res.status(400).json("O campo nome é obrigatório");
  }
  if(!data_nascimento){
    return res.status(400).json("O campo data_nascimento é obrigatório");
  }
  if(!email){
    return res.status(400).json("O campo email é obrigatório");
  }
  if(!senha){
    return res.status(400).json("O campo senha é obrigatório");
  }

  try {
    const usuario = await conexao.query('select * from usuarios where email = $1', [email]);

    if(usuario.rowCount > 0){
      return res.status(400).json("Email já cadastrado")
    }

    
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const login = async () => {
  
}

module.exports = {
  cadastrarUsuario,
  login
}