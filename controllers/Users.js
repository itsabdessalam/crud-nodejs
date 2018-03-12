const User = require('../models/User');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');

module.exports = {

    index: (req, res) => {
        if (req.session.connected === true) {
            User.find({}).exec(function (error, users) {
                if (error) {
                    throw error;
                }
                res.render('listUsers', {
                    users
                });
            });
        }

    },
    add: (req, res) => {
        res.render('users/add', {
            title: 'Sign Up - nodejs•blog'
        });
    },
    create: (req, res) => {

        const username = req.body.username;
        const email = req.body.email;
        const type = req.body.type;
        const password = req.body.password;
        const password_c = req.body.password_c;

        req.checkBody("username", "Username is required").notEmpty();
        req.checkBody("email", "Email is required").notEmpty();
        req.checkBody("type", "Type is required").notEmpty();
        req.checkBody("email", "Email is not valid").isEmail();
        req.checkBody("password", "Password is required").notEmpty();
        req
            .checkBody("password_c", "Passwords do not match")
            .equals(req.body.password);
        const errors = req.validationErrors();
        if (errors) {
            res.redirect('/users/signup');
        } else {
            const user = new User({
                username: username,
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                type: type
            });
            user.save(function (error) {
                if (error) {
                    console.log('User already inserted')
                }
            });
            res.redirect('/users/signin')
        }
    },
    delete: (req, res) => {
        User.findById(req.params.id, function (error, user) {
            if (error) {
                throw error
            };
            user.remove(function (error) {
                if (error) {
                    throw error
                };
                console.log('Successfully deleted!');
            });
        });
        res.redirect('/users');
    },
    update: (req, res) => {
        User.findById(req.params.id, function (error, user) {
            if (error) {
                throw error;
            }
            user.username = req.body.username;
            user.password = req.body.password
            user.save(function (error, user) {
                if (error) {
                    throw error
                }
                console.log('successfuly updated')

            })
        })
        res.redirect('/users')

    },
    connect: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        req.checkBody("email", "Email is required").notEmpty();
        req.checkBody("email", "Email is not valid").isEmail();
        req.checkBody("password", "Password is required").notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            res.send(errors)
        } else {
            User.find({
                email: req.body.email
            }, function (error, user) {
                if (error) {
                    throw error
                }
                if (!user.length) {
                    res.send('No user found');
                } else {
                    if (bcrypt.compareSync(password, user[0].password)) {
                        req.session.connected = true;
                        req.session.user = user;
                        res.redirect('/users/dashboard/posts')
                    } else {
                        res.send(error);
                    }
                }
            })
        }
    },
    login: (req, res) => {
        res.render('users/login', {
            title: 'Sign In - nodejs•blog'
        })
    },
    dashboard: (req, res) => {
        res.send(req.session.user);
    },
    profile: (req, res) => {
        res.send(req.session.user);
    },
    logout: function (req, res) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err)
                } else {
                    return res.redirect('/')
                }
            })
        }

    }
}