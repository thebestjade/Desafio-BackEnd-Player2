const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const segredo = require("../segredo_jwt");

const cadastrarUsuario = async (req, res) => {
  const { nome, data_nascimento, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json("O campo nome é obrigatório");
  }
  if (!data_nascimento) {
    return res.status(400).json("O campo data_nascimento é obrigatório");
  }
  if (!email) {
    return res.status(400).json("O campo email é obrigatório");
  }
  if (!senha) {
    return res.status(400).json("O campo senha é obrigatório");
  }

  try {
    const usuario = await conexao.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount > 0) {
      return res.status(400).json("Email já cadastrado");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await conexao.query(
      "insert into usuarios (nome, data_nascimento, email, senha) values ($1, $2, $3, $4)",
      [nome, data_nascimento, email, senhaCriptografada]
    );

    if (usuarioCadastrado.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuario");
    }

    return res.status(200).json("Usuario cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json("O campo email é obrigatório");
  }
  if (!senha) {
    return res.status(400).json("O campo senha é obrigatório");
  }

  try {
    const usuarios = await conexao.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuarios.rowCount === 0) {
      return res.status(404).json("Usuario não cadastrado");
    }

    const usuario = usuarios.rows[0];

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json("Email ou senha incorreto");
    }

    const token = jwt.sign({ id: usuario.id }, segredo, { expiresIn: "1d" });

    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    return res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  login,
};
