const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const app = express();

router.get('/endereco', enderecoController.enderecoCadastroView);
router.post('/endereco', enderecoController.postEndereco);

module.exports = router;