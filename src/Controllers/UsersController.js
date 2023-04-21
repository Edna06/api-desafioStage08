const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

//o hash criptografa e o compare faz a comparação das senhas para que eu consiga modificá-las  posteriormente
const { hash, compare } = require('bcryptjs')

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
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const database = await sqliteConnection()

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

    //lançando erro caso o usuário não esteja cadastrado no banco de dados
    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    //caso o email que esteja sendo inserido seja igual a de um usuário já cadastrado
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Esse email já está em uso!')
    }

    // atualizando a senha do usuário
    if( password && !old_password) {
      throw new AppError("É necessário que seja inserida a senha antiga para que ela seja atualizada.")
    }

    //analisar se a senha antiga confere
    if( password && old_password){
        const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere")
      }

     user.password = await hash(password, 8)
    }

    //agora, atualizando os dados do usuário. Irei verificar se existe um novo valor inserido para que esse valor não fique em branco
    user.name = name ?? user.name
    user.email = email ?? user.email

    await database.run(
      ` UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = (?)`,
      [user.name, user.email, user.password, user_id]
    )

    return response.json()
  }
}

module.exports = UsersController
