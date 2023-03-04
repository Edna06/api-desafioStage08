const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

const { hash } = require('bcryptjs')

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

    const encryptUserPassword = await hash(password, 8)

    //cadastrando novo usuário
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, encryptUserPassword]
    )

    return response.status(204).end()
  }

  async update(request, response) {
    const { name, email } = request.body
    const { id } = request.params

    const database = await sqliteConnection()

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    //lançando erro caso o usuário não esteja cadastrado no banco de dados
    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    const userWithUpdateEmail = await database.get( 'SELECT * FROM users WHERE email = (?)',[email])

    //caso o email que esteja sendo inserido seja igual a de um usuário já cadastrado
    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError('Esse email já está em uso!')
    }

    //agora, atualizando o email do usuário
    user.name = name
    user.email = email

  await database.run(` UPDATE users SET name = ?, email = ?, updated_at = ? WHERE id = (?)`, [user.name, user.email, new Date(), id])

    return response.json()
  }
}

module.exports = UsersController
