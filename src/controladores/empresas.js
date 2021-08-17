const axios = require("axios");
const conexao = require("../conexao");

const cadastrarEmpresa = async (req, res) => {
  const { cnpj } = req.body;
  const { id } = req;

  if (!cnpj) {
    return res.status(400).json("O campo cnpj é obrigatório");
  }

  try {
    const empresa = await conexao.query(
      "select * from empresas where cnpj = $1",
      [cnpj]
    );

    if (empresa.rowCount > 0) {
      return res.status(400).json("Empresa já cadastrada");
    }

    const empresaAchada = (
      await axios
        .get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .catch((e) => res.status(400).json(e.message))
    )?.data;

    const { razao_social, data_inicio_atividade, uf } = empresaAchada;

    const empresaCadastrada = await conexao.query(
      "insert into empresas (usuario_id, cnpj, razao_social, data_inicio_atividade, estado) values ($1, $2, $3, $4, $5)",
      [id, cnpj, razao_social, data_inicio_atividade, uf]
    );

    if (empresaCadastrada.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar a empresa");
    }

    return res.status(200).json("Empresa cadastrada com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarEmpresas = async (req, res) => {
  const { id } = req;
  try {
    const empresas = await conexao.query("select * from empresas");

    if (empresas.rowCount === 0) {
      return res.status(404).json("Não há nenhuma empresa cadastrada");
    }

    return res.status(200).json(empresas.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarEmpresa = async (req, res) => {
  const { razao_social, data_inicio_atividade, estado } = req.body;
  const { idEmpresa } = req.params;

  if(!idEmpresa){
    return res.status(400).json("O id da empresa precisa ser informado como parâmetro");
  }
  if(!razao_social){
    return res.status(400).json("O campo razao_social é obrigatório");
  }
  if(!data_inicio_atividade){
    return res.status(400).json("O campo data_inicio_atividade é obrigatório");
  }
  if(!estado){
    return res.status(400).json("O campo estado é obrigatório");
  }

  try {
    const empresa = await conexao.query('select * from empresas where id = $1', [idEmpresa]);

    if (empresa.rowCount === 0) {
      return res.status(404).json("Empresa não cadastrada");
    }

    const empresaAtualizada = await conexao.query('update empresas set razao_social = $1, data_inicio_atividade = $2, estado = $3 where id = $4', [razao_social, data_inicio_atividade, estado, idEmpresa]);

    if (empresaAtualizada.rowCount === 0) {
      return res.status(400).json("Não foi possível atualizar a empresa");
    }

    return res.status(200).json("Empresa atualizada")

  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const excluirEmpresa = async (req, res) => {
  const { idEmpresa } = req.params;

  if(!idEmpresa){
    return res.status(400).json("O id da empresa precisa ser informado como parâmetro");
  }

  try {
    const empresa = await conexao.query('select * from empresas where id = $1', [idEmpresa]);

    if (empresa.rowCount === 0) {
      return res.status(404).json("Empresa não cadastrada");
    }
    
    const empresaExcluida = await conexao.query('delete from empresas where id = $1', [idEmpresa]);

    if (empresaExcluida.rowCount === 0) {
      return res.status(400).json("Não foi possível excluir a empresa");
    }

    return res.status(200).json("Empresa excluida")
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarEmpresa,
  listarEmpresas,
  editarEmpresa,
  excluirEmpresa,
};
