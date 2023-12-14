// userController.js
const UserModel = require('../models/userModel')

const salvarUser = (req, res) => {
  const { nome, login, senha, email, dataNasc } = req.body;

  // Chame o método salvarUser do modelo
  UserModel.salvarUser(nome, login, senha, email, dataNasc, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o usuário:', err);
      return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
    res.status(200).json({ message: 'Usuário salvo com sucesso', resultado });
  });
};


const atualizarUser = (req, res) => {
  const { id, nome, login, senha, email, dataNasc } = req.body;

  UserModel.atualizarUser(id, nome, login, senha, email, dataNasc, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar o usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso', resultado });
  });
};
const excluirUser = (req, res) => {
  const { id } = req.params;

  UserModel.excluirUser(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir o usuário:', err);
      return res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso', resultado });
  });
};

const listarUserId = (req, res) => {
  const { id } = req.params;

  UserModel.listarUserId(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao Buscar o usuário:', err);
      return res.status(500).json({ error: 'Erro ao Buscar o usuário' });
    }
    res.status(200).json({ message: 'Usuário encontrado', resultado });
  });
};

const listarUsers = (req, res) => {
  UserModel.listarUsers((err, resultados) => {
    if (err) {
      console.error('Erro ao listar os usuários:', err);
      return res.status(500).json({ error: 'Erro ao listar os usuários' });
    }
    res.status(200).json(resultados);
  });
};

module.exports = { salvarUser, atualizarUser, excluirUser, listarUsers, listarUserId };

