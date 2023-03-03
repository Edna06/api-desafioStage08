const sqlite = require('sqlite') //responsável por conectar 
const sqlite3 = require('sqlite3') // responsável por fazer a comunicação 

const path = require('path')

async function sqliteConnection(){
  const database = await sqlite.open({ //abrindo uma conexão
    filename: path.resolve(__dirname, "..", "database.db"),

    driver: sqlite3.Database //drive de conexão que eu irei utilizar
  })

  return database
}

module.exports = sqliteConnection