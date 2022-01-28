const db = require('../../data/dbConfig')
const validateUserAndPass = (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(401).json({ message: 'Username AND Password are required' })
    } else {
        next()
    }
}

const checkUserUnique = async (req, res, next) => {
    const exists = await db('users').where('username', req.body.username).first()
    if(exists) {
        res.status(400).json({ message: 'username is taken' })
    } else {
        next()
    }
}

const checkUserExists = async (req, res, next) => {
    const exists = await db('users').where('username', req.body.username).first()
    if(!exists) {
        res.status(400).json({ message: 'invalid credentials' })
    } else {
        next()
    }
}

module.exports = {
    validateUserAndPass,
    checkUserUnique,
    checkUserExists,
}