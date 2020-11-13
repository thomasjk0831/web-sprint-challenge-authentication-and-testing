const db = require('../database/dbConfig')

module.exports = {
    find,
    findById,
    findBy,
    add
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}

function add(user) {
    return db('users').insert(user, "id")
        .then(idArr => {
            return findById(idArr[0])
        })
}

function findBy(filter) {
    return db("users").where(filter)
}