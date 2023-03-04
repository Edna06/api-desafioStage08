const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body
    //verificando se o usuário informou o nome e enviando notificaçõa caso ele não tenha informado

    const database = await sqliteConnection()

    const checkUserExists = await database.get(
      ' SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExists) {
      throw new AppError('Usuário já está em uso!')
    }

    //cadastrando novo usuário
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    )



    

    return response.status(204).end()
  }
}

module.exports = UsersController
