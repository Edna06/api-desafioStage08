const {Router} = require('express')
const notesRouter = require('./notes.routes.js')
const usersRouter = require('./users.routes.js')
const tagsRouter = require('./tags.routes')
const sessionRouter = require('./sessions.routes')

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/movie_notes", notesRouter)
routes.use("/movie_tags", tagsRouter)
routes.use("/session", sessionRouter)


module.exports = routes