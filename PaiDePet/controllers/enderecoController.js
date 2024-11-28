const Endereco = require('../models/endereco');

function getEnderecoView(req, res) {
    const usuarioId = req.session.usuarioId;

    if (!usuarioId) {
        return res.status(401).send("Usuário não autenticado");
    }

    Endereco.findAll({ where: { usuarioId } }).then((enderecos) => {
        res.render('enderecoCadastrado.html', { enderecos });
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Erro ao buscar endereços");
    });
}

function enderecoCadastroView(req, res) {
    let erro_form = req.query.erro_form;
    let nome = req.query.nome;
    let cep = req.query.cep;
    let endereco = req.query.endereco;
    let numero = req.query.numero;
    let complemento = req.query.complemento;
    res.render('endereco.html', { erro_form, nome, cep, endereco, numero, complemento });
}

function postEndereco(req, res) {
    const usuarioId = req.session.usuarioId;

    if (!usuarioId) {
        return res.status(401).send("Usuário não autenticado");
    }

    let dados = {
        nome: req.body.nome,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento,
        usuarioId: usuarioId
    };

    let erro_form = false;
    if (dados.nome.length == 0 || dados.cep.length == 0 || dados.endereco.length == 0 || dados.numero.length == 0 || dados.complemento.length == 0) {
        erro_form = true;
    }

    if (erro_form) {
        res.redirect(`/?erro_form=1&nome=${dados.nome}&cep=${dados.cep}&endereco=${dados.endereco}&numero=${dados.numero}&complemento=${dados.complemento}`);
    } else {
        Endereco.create(dados).then(() => {
            res.redirect('/enderecoCadastrado');
        }).catch((err) => {
            console.log(err);
            res.redirect(`/endereco?erro_form=1`);
        });
    }
}

function editarEndereco(req, res) {
    const usuarioId = req.session.usuarioId; 
    const enderecoId = req.params.id;  

    if (!usuarioId) {
        return res.status(401).send("Usuário não autenticado");
    }

    Endereco.findOne({ where: { id: enderecoId, usuarioId } })
        .then(endereco => {
            if (!endereco) {
                return res.status(404).send("Endereço não encontrado");
            }

            res.render('endereco.html', {
                nome: endereco.nome,
                cep: endereco.cep,
                endereco: endereco.endereco,
                numero: endereco.numero,
                complemento: endereco.complemento,
                id: endereco.id  
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Erro ao buscar o endereço");
        });
}


function atualizarEndereco(req, res) {
    const usuarioId = req.session.usuarioId; 
    const enderecoId = req.params.id;  

    if (!usuarioId) {
        return res.status(401).send("Usuário não autenticado");
    }

    Endereco.findOne({ where: { id: enderecoId, usuarioId } })
        .then(endereco => {
            if (!endereco) {
                return res.status(404).send("Endereço não encontrado");
            }

            endereco.update({
                nome: req.body.nome,
                cep: req.body.cep,
                endereco: req.body.endereco,
                numero: req.body.numero,
                complemento: req.body.complemento
            })
            .then(() => {
                res.redirect('/enderecoCadastrado');  
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("Erro ao atualizar o endereço");
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Erro ao buscar o endereço para atualização");
        });
}

function excluirEndereco(req, res) {
    const usuarioId = req.session.usuarioId;  
    const enderecoId = req.params.id;         

    if (!usuarioId) {
        return res.status(401).send("Usuário não autenticado");
    }

    Endereco.findOne({ where: { id: enderecoId, usuarioId } })
        .then(endereco => {
            if (!endereco) {
                return res.status(404).send("Endereço não encontrado");
            }
            endereco.destroy()
                .then(() => {
                    res.redirect('/enderecoCadastrado');  
                })
                .catch(err => {
                    console.error('Erro ao excluir o endereço:', err);
                    res.status(500).send("Erro ao excluir o endereço");
                });
        })
        .catch(err => {
            console.error('Erro ao buscar o endereço para exclusão:', err);
            res.status(500).send("Erro ao buscar o endereço");
        });
}


module.exports = {
    enderecoCadastroView,
    postEndereco,
    getEnderecoView,
    editarEndereco,  
    atualizarEndereco,
    excluirEndereco 
};
