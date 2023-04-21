const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../Controllers/UsersController')
const ensureAuthenticated = require('../Middleware/ensureAuthenticated')

const userRoutes = Router()

const usersController = new UsersController()

const upload = multer(uploadConfig.MULTER) //o multer vai ser o responsável por carregar a nossa imagem

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)

userRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'),
(request, response) => {
  console.log(request.file.filename)

  response.json()
  }
)

module.exports = userRoutes