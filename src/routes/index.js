const {Router} = require('express')
const notesRouter = require('./notes.routes.js')
const usersRouter = require('./users.routes.js')
const tagsRouter = require('./tags.routes')

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/movie_notes", notesRouter)
routes.use("/movie_tags", tagsRouter)


module.exports = routes