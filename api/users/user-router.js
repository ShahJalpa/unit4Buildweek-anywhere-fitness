const router = require('express').Router();
const Users = require('./user-model');
const { checkUserId } = require('../middleware/user-middleware')
const { jwtSecret } = require('../auth/secrets')
const jwt = require('jsonwebtoken');

//  BASE_URL /api/users

router.get('/', (req, res) => {
  Users.getAll()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(500).json({message: err.message}))
});

router.get('/user/:id', checkUserId, (req, res) => {
   const userid = req.params.id
   Users.getById(userid)
       .then(user => {
         res.json({username: user.username, name: user.name, email: user.email, role: user.role })
       })
       .catch( err => {
         res.status(500).json({message: err.message});
       })
})

router.put('/user/:id', checkUserId, (req, res) => {
  const userid = req.params.id;
  const newUser = { ...req.body, userid };

  Users.update(newUser)
       .then(user => {
         res.json({message: 'user info sucessfully updated', user: user[0]});
       })
       .catch(error => 
          res.status(500).json({message: error.message})
         ) 
})

router.delete('/:id', checkUserId, (req, res) => {
  const id = req.params.id;

  Users.remove(id)
       .then(() => res.json({message: 'user is deleted sucessfully'}))
       .catch(error => 
        res.status(500).json({ message: error.message })
      )
})

router.get('/getuserinfo', async(req, res) => {
  const token = req.headers.authorization
  console.log('get user info function')
  if(!token) {
    res.status(400).json({message: 'no token is found, none user is logged in'})
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err) {
        res.status(401).json({message: 'token is invalid'})
      } else {
        res.json('welcome to your info')
      }
    })
  }
})

module.exports = router;


