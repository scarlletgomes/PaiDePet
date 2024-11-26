const Sequelize = require('sequelize');
const db = require('../db');

const Endereco = db.define('endereco', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },   
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numero: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    indicador_ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Endereco;