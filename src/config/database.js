const { Client } = require('pg')
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = require('./env')

let connectionDatabaseInstance

function getConnectionDatabase(){
    if (connectionDatabaseInstance){
        return connectionDatabaseInstance
    } 
    connectionDatabaseInstance = new Client({
        user: DB_USER,
        host: DB_HOST,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        port: DB_PORT
    })
    connectionDatabaseInstance.connect().then(function(){
        console.log('Conectado com Sucesso!')
    }).catch(function(error){
        console.log('Erro ao tentar conectar!', error)
    })
    return connectionDatabaseInstance
}

module.exports = {
    getConnectionDatabase
}