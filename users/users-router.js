const router = require('express').Router()

const Users = require('./users-model')
const authenticate = require('../auth/authenticate-middleware')

router.get('/', authenticate, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ msg: err.message })
        })
})

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ msg: err.message })
        })
})

module.exports = router