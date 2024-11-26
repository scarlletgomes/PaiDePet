const Endereco = require('../models/endereco');

function enderecoCadastroView(req, res){
    let erro_form = req.query.erro_form;
    res.render('endereco.html', {erro_form});
}

function postEndereco(req, res){
    let dados = {
        nome: req.body.nome,
        id_usuario: req.session.id,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        inidicador_ativo: 1,
        complemento: req.body.complemento
    };

    let erro_form = false;
    if(dados.nome.length == 0){
        erro_form = true;
    }
    if(dados.cep.length == 0){
        erro_form = true;
    }
    if(dados.endereco.length == 0){
        erro_form = true;
    }
    if(dados.numero.length == 0){
        erro_form = true;
    }
    if(dados.complemento.length == 0){
        erro_form = true;
    }

    else{
        Endereco.create(dados).then(()=>{
            res.redirect('/endereco');
        }).catch((err)=>{
            console.log(err);
            res.redirect(`/endereco?erro_form=1`);
        });
    }
    
}

<<<<<<< Updated upstream
=======
function getEnderecoView(req,res){
    Endereco.findAll({
        where: {
            id_usuario: req.session.usuario.id,
            inidicador_ativo: 1
        }
    }).then((enderecos)=>{
        res.render('enderecoCadastrado.html', {enderecos});
    }).catch((erro_form)=>{
        res.render('login-cadastro.html', {erro_form});
    });
}

>>>>>>> Stashed changes
module.exports = {
    enderecoCadastroView,
    postEndereco
}