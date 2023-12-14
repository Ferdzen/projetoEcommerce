// userModel.js
const { connection } = require('../config');

class UserModel {
  static salvarUser(nome, login, senha, email, dataNasc) {
    const query = 'INSERT INTO usuario (nome, login, senha, email, dataNasc) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, login, senha, email, dataNasc], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarUserPorId(id, callback) {
    const query = 'SELECT * FROM usuario WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // User não encontrado
      }
      callback(null, results[0]);
    });
  }


  // Outros métodos, como atualizarUser, excluirUser, listarUsers, etc.


  static atualizarUser(id, nome, login, senha, email, dataNasc, callback) {
    const query = 'UPDATE usuario SET nome=?, login=?, senha=?, email=?, dataNasc=? WHERE id=?';
    connection.query(query, [nome, login, senha, email, dataNasc, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static excluirUser(id, callback) {
    const query = 'DELETE FROM usuario WHERE id=?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
  static listarUserId(id, callback) {
    const query = 'SELECT * FROM usuario WHERE id=?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarUsers(callback) {
    const query = 'SELECT * FROM usuario';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  

}

module.exports = UserModel;
