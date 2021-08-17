const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo_jwt');

const validarToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json('O token é obrigatório');
  }

  try {

    const { id } = jwt.verify(token, segredo);

    req.id = id;

    next();

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = validarToken;