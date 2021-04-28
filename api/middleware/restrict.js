const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../auth/secrets');

module.exports = (req, res, next) => {
    let token = req.headers.authorization;

    if(!token) {
        res.status(401).json({message: 'token required'})
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({message: 'token is invalid'})
            } else {
                req.decodedJwt = decoded;
                next()
            }
        })
    }
}