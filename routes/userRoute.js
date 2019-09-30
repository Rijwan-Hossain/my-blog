const express = require('express') 
const router = express.Router() 
const {
    allUser, 
    singleUser, 
    registration
} = require('../controllers/userController')
// routes 
router.post('/registration', registration)

module.exports = router 