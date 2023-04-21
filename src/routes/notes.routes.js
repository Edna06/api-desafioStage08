const { Router } = require('express')
const NotesController = require('../Controllers/NotesController')

const ensureAuthenticated = require('../Middleware/ensureAuthenticated')

const notesRoutes = Router()
const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show) // usa o id da nota mesmo
notesRoutes.delete("/:id", notesController.delete) // usa o id da nota mesmo
notesRoutes.get("/", notesController.index)





module.exports = notesRoutes