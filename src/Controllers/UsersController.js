const AppError = require('../utils/AppError')


class UsersController {
  create(request, response) {
    const { name, email, password } = request.body

    //verificando se o usuário informou o nome e enviando notificaçõa caso ele não tenha informado
    if(!name){
      throw new AppError("Nome é obrigatório!")
    }

    response.status(201).json({ name, email, password })
  }
}

module.exports = UsersController
