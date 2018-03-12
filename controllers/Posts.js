const Post = require('../models/Post');


module.exports = {
    index: (req, res) => {
        Post.find({
            author: req.session.user[0].username
        }, null, {
            sort: {
                created_on: -1
            }
        }, function (error, posts) {
            if (error) {
                throw error;
            }
            res.render('posts/index', {
                posts
            })
        }).where
    },
    add: (req, res) => {

        res.render('posts/add');
    },
    create: (req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const author = req.session.user[0].username;
        req.checkBody("title", "Title is required").notEmpty();
        req.checkBody("content", "Content is required").notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            res.send(errors);
        } else {
            const post = new Post({
                title: title,
                content: content,
                author: author
            });
            post.save(function (error) {
                if (error) {
                    console.log('Error on Posts')
                }
            });
            res.redirect('/users/dashboard/posts')
        }
    },
    delete: (req, res) => {
        Post.findById(req.params.id, function (error, post) {
            if (error) {
                throw error
            };
            post.remove(function (error) {
                if (error) {
                    throw error
                };
                console.log('Successfully deleted!');
            });
        });
        res.redirect('/users/dashboard/posts');
    },
    edit: (req, res) => {
        Post.findById(req.params.id, function (error, post) {
            if (error) {
                throw error;
            }
            res.render('posts/edit', {
                post
            })
        })
    },

    update: (req, res) => {
        Post.findById(req.params.id, function (error, post) {
            if (error) {
                throw error;
            }
            post.title = req.body.title;
            post.content = req.body.content
            post.save(function (error, user) {
                if (error) {
                    throw error
                }
                console.log('successfuly updated')

            })
        })
        res.redirect('/users/dashboard/posts')
    },
    show: (req, res) => {
        Post.findById(req.params.id, function (error, post) {
            if (error) {
                throw error;
            }
            res.render('posts/show', {
                post
            })
        })
    }
}