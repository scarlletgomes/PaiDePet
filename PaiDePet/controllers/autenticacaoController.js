const Usuario = require('../models/usuario');

async function login(req, res){
    const usuario = await Usuario.findOne({
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    });

    if(usuario !== null){
        req.session.autorizado = true;
        req.session.usuario = usuario;
        res.redirect('/endereco');
    }
    else{
        let erro_autenticacao = true;
        res.render('login-cadastro.html', {erro_autenticacao});

    }
}

function verificarLogin(req, res, next) {
    if(req.session.autorizado){
        console.log('usuário autorizado');
        res.redirect('/endereco');
        next();
    }
    else{
        console.log('usuário NÃO autorizado');
        res.redirect('/login-cadastro.html');
    }
}

function sair(req, res){
    req.session.destroy();
    res.redirect('/login-cadastro.html');
}

module.exports = {
    login,
    verificarLogin,
    sair
}