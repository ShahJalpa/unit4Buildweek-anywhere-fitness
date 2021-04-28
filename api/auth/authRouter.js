const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../users/user-model');

const {
    checkRegisterPayload,
    checkLoginPayload,
    checkUserExists,
    checkUsernameAvailability,
} = require('../middleware/user-middleware');

const { jwtSecret } = require('./secrets');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', checkRegisterPayload, checkUsernameAvailability, (req, res) => {
    const {username, password, name, email, role} = req.body;
    const hash = bcrypt.hashSync(password, 8);
    User.insert({ username, password:hash, name, email, role})
        .then(user => {
            res.status(201).json({user: user[0], message: 'registeration is sucessful'})
         })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

router.post('/login', checkLoginPayload, checkUserExists, (req, res) => {
    const {  username, password } = req.body;
    User.getByUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const access_token = buildToken(user);
                res.json({message: 'you have logged in sucessfully', access_token, user})
            } else {
                res.status(401).json({message: 'invalid credentials'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

router.get('/api/auth/logout', (req, res) => {
    res.json({message: 'this end point does nothing'})
})

function buildToken(user) {
    const payload = {
        subject: user.id        
    }
    const config = {
        expiresIn: '1h'
    }

    return jwt.sign(
        payload, jwtSecret, config
    )
}

module.exports = router