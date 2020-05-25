const bcrypt = require('bcrypt')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/

const { User }  = require('../models')

module.exports = {
    signup(req, res) {
        const { body: { username, password, email } } = req

        if (!username.trim() || !password || !email) {
            return res.status(400).json({
                msg: 'Fields are required',
                success: false
            })
        }

        if (username.length < 4 || username.length > 16) {
            return res.status(400).json({
                msg: 'Name must be at least 4 characters, no more than 16 characters',
                success: false
            })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                msg: 'Please enter valid email',
                success: false

            })
        }

        if (!passwordRegex.test(password)){
            return res.status(400).json({
                msg: 'Password matching expression. Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.',
                success: false
            })
        }


        User.findOne({ where: {email: email} })
            .then(function(userExist) {

            if (userExist) {
                return res.status(422).json({
                    msg: 'User is already existing',
                    userExist
                })
            } else{
                User.create({
                    username: username,
                    email: email,
                    password : bcrypt.hashSync(password, 10),
                    isAdmin: false
                }).then(response =>{
                    return res.status(201).json({
                        msg: "User has been register",
                        username
                    });
                });
            }

        })

    },




    signin(req, res) {
        const { body: { username } } = req
        return res.status(200).json({
            msg: `Bienvenue ${ username } !`
        })
    }
}