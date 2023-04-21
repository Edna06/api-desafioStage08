const { Router } = require('express')
const UsersController = require('../Controllers/UsersController')
const ensureAuthenticated = require('../Middleware/ensureAuthenticated')

const userRoutes = Router()

const usersController = new UsersController()

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)


module.exports = userRoutes