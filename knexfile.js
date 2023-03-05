
const path = require('path')


module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db') // em que lugar está o nosso arquivo de banco de dados 
    },
    // adicionando o migrations 
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
}
