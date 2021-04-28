  
const db = require('../data/db-config');
const bcrypt = require('bcryptjs');

function getAll () {
    return db('users').select('id', 'username', 'name', 'email', 'role');
}

function getById(id){
    return db('users').where({id}).first()
}

function getByUsername(username) {
    return db('users').where({username}).first()
}

async function insert(user){
    return await db('users').insert(user, ["id", "username", "password", 'name', 'email', 'role'])  
}

async function update(user) {
    const {id, password} = user
    const updatedUser = user
    if(password){
        updatedUser.password = bcrypt.hashSync(password, 8)
    }
    return await db('users').where({id}).update(updatedUser, ["id", "username", "password", 'name', 'email', 'role'])
}

async function remove(id) {
    return db('users').where({id}).delete()
}
module.exports = {
    getAll,
    getById,
    getByUsername,
    insert, 
    update,
    remove
}