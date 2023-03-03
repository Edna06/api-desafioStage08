class AppError {
  message
  statusCode

  constructor(message, statusCode = 400) {
    //o que eu receber na mensagem aqui, eu quero que passe para o contexto global 
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError
