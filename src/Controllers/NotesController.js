const knex = require('../database/knex')

class NotesController {
  //criando nota
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const note_id = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        user_id,
        name
      }
    })

    await knex('movie_tags').insert(tagsInsert)

    return response.json()
  }

  //exibindo nota
  async show(request, response) {
    const { id } = request.params

    const note = await knex('movie_notes').where({ id }).first()
    const tags = await knex('movie_tags').where({ note_id: id }).orderBy('name')

    return response.json({
      ...note,
      tags
    })
  }

  //deletando nota
  async delete(request, response) {
    const { id } = request.params

    await knex('movie_notes').where({ id }).delete()

    return response.json()
  }

  //listando notas
  async index(request, response) {
    //vou inserir os dados pela query
    const { user_id, title, tags } = request.query

    let notes
    
    //filtrando por tags
    if(tags) {
      const filterTags = tags.split(",").map(tag => tag.trim()) //filtrando somente a tag
    
      notes = await knex("movie_tags").whereIn('name', filterTags)
    } else {
      notes = await knex('movie_notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }
    return response.json(notes)
  }
}

module.exports = NotesController
