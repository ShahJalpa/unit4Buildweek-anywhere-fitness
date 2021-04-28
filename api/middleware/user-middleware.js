const User = require('../users/user-model');

const checkRegisterPayload = (req, res, next) => {
    const {username, password, name, email, role } = req.body;
    if(!username || !password || !name || !email || !role) {
        res.status(400).json({message: 'all fields are required'})
    } else {
        next()
    }
}

const checkUsernameAvailability = (req, res, next) => {
    User.getByUsername(req.body.username)
       .then(user => {
           if(user) {
               res.status(400).json({message: 'username is already exist'})
           } else {
               next()
           }
       })
       .catch( err => {
           next(err);
       })
}

const checkLoginPayload = (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(400).json({message: 'username and password required!'})
    } else {
        next()
    }
}

const checkUserExists = (req, res, next) => {
    User.getByUsername(req.body.username)
       .then(user => {
           if(!user) {
               res.status(401).json({message: 'invalid credentials'})
           } else {
               next()
           }
       })
       .catch(err => {
           next(err)
       })
}

const checkUserId = (req, res, next) => {
    User.getById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(400).json({message: `user with this ${req.params.id} not found`})
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}
module.exports = {
    checkRegisterPayload,
    checkLoginPayload,
    checkUserExists,
    checkUsernameAvailability,
    checkUserId
}