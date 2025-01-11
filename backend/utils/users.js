import bcrypt from 'bcryptjs'

const users = [
    {
    name : 'Admin User',
    email : 'admin@gmail.com',
    password : bcrypt.hashSync('123456'),
    isAdmin: true
    },
    {
    name : 'Umang',
    email : 'Umang@technologist.com',
    password: bcrypt.hashSync('123456')
    }]

export default users;