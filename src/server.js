require('express-async-errors') //importando a biblioteca para lidar com erros no servidor e do cliente
const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')
const migrationsRun = require('./database/sqlite/migrations')

const app = express()

app.use(express.json())

app.use(routes)

app.use((error, request, response, next) => {
  //se o erro for do cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  console.error(error)

  //se o error não for do tipo anterior
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333

migrationsRun() // responsável por criar/carregar o meu banco de dados

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
