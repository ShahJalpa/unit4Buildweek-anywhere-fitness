const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

//import routers
const authRouter = require('./auth/authRouter')
const userRouter = require('./users/user-router')
const restrict = require('./middleware/restrict');

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

//end points of routers
server.use('/api/users', restrict, userRouter);
server.use('/api/auth', authRouter)

//testing
server.get("/", (req, res) => {
  console.log(process.env.SECRET);
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
