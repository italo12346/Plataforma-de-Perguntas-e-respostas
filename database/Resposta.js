const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('resposta',{ // Define Cria tabelas 
    corpo:{
        // Primeiro se declara o tipo do campo 
        type: Sequelize.TEXT,
        allowNull: false // não pode ser vazio 
    },
    // Fazendo um relacionamento CRU / RAW
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false 
    }
});

// Sincronizando com o banco
// Force: Não recria a tabela caso ela ja exista
Resposta.sync({force: false})

// exportar modulo para ser chamado externamente 
module.exports = Resposta