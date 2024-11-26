const Usuario = require('../models/usuario');
const Endereco = require('../models/endereco');

async function login(req, res) {
    try {
        const usuario = await Usuario.findOne({
            where: {
                email: req.body.email,
                senha: req.body.senha,
            },
        });

        if (usuario) {
            req.session.autorizado = true;
            req.session.usuario = usuario;
            req.session.usuarioId = usuario.id;

            const enderecoCadastrado = await Endereco.findOne({
                where: { usuarioId: usuario.id },
            });

            if (enderecoCadastrado) {
                res.redirect('/enderecoCadastrado');
            } else {
                res.redirect('/endereco'); 
            }
        } else {
            res.redirect('/login-cadastro?erro_login=1');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).send('Erro interno no servidor');
    }
}

function verificarLogin(req, res, next) {
    if(req.session.autorizado){
        console.log('usuário autorizado');
        res.redirect('/enderecoCadastrado.html');
        next();
    }
    else{
        console.log('usuário NÃO autorizado');
        res.redirect('/login-cadastro.html');
    }
}

function sair(req, res){
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    login,
    verificarLogin,
    sair
}