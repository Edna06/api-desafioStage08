//middleware de autenticação

const { verify } = require('jsonwebtoken')

const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization //passando a localização do token do usuário

  if (!authHeader) {
    throw new AppError('JWT não informado', 401)
  }

  //se caso o token exista:
  const [, token] = authHeader.split(' ') //eu vou usar o split para quebrar o texto em array, pegar os dados que vem depois e o que vem antes, separando-os entre vírgula( 'Bare','token')

  //tratando exceções
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) //user_id sendo criado aqui

    request.user = {
      id: Number(user_id)
    }

    return next()
  } catch {
    throw new AppError('JWT token inválido', 401)
  }
}

module.exports = ensureAuthenticated
