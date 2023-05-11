const sequelize = require('sequelize')
const connection = new sequelize('SsPerguntas','root','123456',{
    host: 'localhost',
    dialect:'mysql',
    logging: false
})

module.exports = connection
