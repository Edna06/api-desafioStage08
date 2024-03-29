const knex = require('../database/knex')
const AppError = require('../utils/AppError')

const { compare } = require('bcryptjs')

const authConfig = require('../configs/auth')
const {sign} = require('jsonwebtoken') //importando o método sign da dependência
class SessionController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {subject: String(user.id), expiresIn}) // sign retornará uma string que representa o token JWT assinado. 

    return response.json({user, token}) //tem que me retornar os dados do usuário e o token de autenticação
  }
}

module.exports = SessionController
