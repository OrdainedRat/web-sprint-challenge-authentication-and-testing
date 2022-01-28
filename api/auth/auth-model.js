const db = require('../../data/dbConfig')

async function createUser(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}

function findById(id) {
    return db('users')
      .where({ id })
      .first()
  }

async function findBy(filter) {
    return db('users').where(filter).first()
}

module.exports = {
    createUser,
    findById,
    findBy,
}