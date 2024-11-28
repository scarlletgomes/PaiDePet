const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const app = express();

router.get('/endereco', enderecoController.enderecoCadastroView);
router.post('/endereco', enderecoController.postEndereco);
router.get('/enderecoCadastrado', enderecoController.getEnderecoView);
router.get('/endereco/:id', enderecoController.editarEndereco);  
router.post('/endereco/:id', enderecoController.atualizarEndereco);  

module.exports = router;

