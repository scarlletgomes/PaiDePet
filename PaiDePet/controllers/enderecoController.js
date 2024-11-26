const Endereco = require('../models/endereco');

function enderecoCadastroView(req, res){
    let erro_form = req.query.erro_form;
    let nome = req.query.nome;
    let cep = req.query.cep;
    let endereco = req.query.endereco;
    let numero = req.query.numero;
    let complemento = req.query.complemento;
    res.render('endereco.html', {erro_form, nome, cep, endereco, numero, complemento});
}

function postEndereco(req, res){
    let dados = {
        nome: req.body.nome,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
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
    if(erro_form){
        res.redirect(`/?erro_form=1&nome=${dados.nome}&cep=${dados.cep}&endereco=${dados.endereco}&numero=${dados.numero}&complemento=${dados.complemento}`);  
    }
    else{
        Endereco.create(dados).then(()=>{
            res.redirect('/enderecoCadastrado.html');
        }).catch((err)=>{
            console.log(err);
            res.redirect(`/endereco?erro_form=1`);
        });
    }
    
}

function getEnderecoView(req,res){
    Endereco.findAll().then((enderecos)=>{
        res.render('enderecoCadastrado.html', {enderecos});
    })
}

module.exports = {
    enderecoCadastroView,
    postEndereco,
    getEnderecoView
}