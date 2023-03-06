const {Router} = require('express')
const notesRoutes = require('./notes.routes.js')
const usersRouter = require('./users.routes.js')

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/movie_notes", notesRoutes)

module.exports = routes