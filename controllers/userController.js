const User = require('../models/User') 
const bcrypt = require('bcryptjs')
const validator = require('validator') 
const jwt = require('jsonwebtoken') 

// get all user 
const allUser = (req, res) => { 
    User.find() 
        .then(user => { 
            res.json({ 
                user 
            }) 
        }) 
        .catch(err => {
            res.json({
                message: 'Server error'
            }) 
        }) 
} 

// get single user 
const singleUser = (req, res) => { 
    User.findOne({email: req.body.email}) 
        .then(user => { 
            if(Object.keys(user).length > 0) { 
                res.json({ 
                    user 
                }) 
            } 
            else { 
                res.json({ 
                    message: 'No user found' 
                }) 
            } 
        }) 
        .catch(err => { 
            res.json({ 
                message: 'Server error'
            }) 
        }) 
} 


// registration 
const registration = (req, res) => {
    // take user data 
    // validate email 
    // check duplicate email 
    // hash password 
    // save to DB
    // send message 
    let { name, avatar, email, password } = req.body

    // validate email 
    if(! validator.isEmail(email)) {
        return res.json({message: 'Invalid email'}) 
    } 

    // check duplicate email 
    User.findOne({ email }) 
        .then(user => { 
            if(user) { 
                return res.json({message: 'Email is already in use'}) 
            } 

            // hash password 
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) { return res.json({error: err}) } 

                // save to DB 
                User.find() 
                .then(users => { 
                    if(users.length === 0) { 
                        // admin account 
                        let newUser = new User({ 
                            name, avatar, email, 
                            password: hash, role: 'admin' 
                        }) 
                        
                        newUser.save() 
                        .then((data) => { 
                            return res.json({ 
                                message: 'Admin Account created successfully', 
                                user: data
                            }) 
                        }) 
                    } 
                    
                    //  user account
                    let newUser = new User({ 
                        name, avatar, email, 
                        password: hash, role: 'user'
                    }) 
                    
                    newUser.save() 
                    .then((data) => { 
                        return res.json({ 
                            message: 'User Account created successfully', 
                            user: data
                        }) 
                    }) 
                }) 
            }) 
        }) 
        .catch(err => { return res.json({message: 'Server Error'})}) 
} 

// login 



module.exports = {
    allUser, 
    singleUser, 
    registration
}
