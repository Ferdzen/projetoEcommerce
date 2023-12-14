// produtoRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/salvar-user', userController.salvarUser);
router.put('/atualizar-user', userController.atualizarUser);
router.delete('/excluir-user/:id', userController.excluirUser);
router.get('/listar-users', userController.listarUsers);
router.get('/listar-user/:id', userController.listarUserId);


module.exports = router;
