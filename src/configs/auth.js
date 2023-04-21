//deixaremos aqui as configurações de autenticação da nossa aplicação

module.exports = {
  jwt: {
    secret: 'default', // representa a chave secreta usada para assinar o token.
    expiresIn: '1d' //tempo de expiração
  }
}