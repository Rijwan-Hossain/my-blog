const express = require('express') 
const router = express.Router() 
const { 
    allUser, 
    singleUser, 
    registration, 
    login 
} = require('../controllers/userController') 

// routes 
router.post('/registration', registration) 
router.post('/login', login) 
router.get('/users', allUser) 
router.get('/user', singleUser) 

module.exports = router 