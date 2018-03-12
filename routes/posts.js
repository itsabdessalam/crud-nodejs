var express = require('express');
var router = express.Router();
const Post = require('../controllers/Posts.js')

/* GET users listing. */


router
    .route('/')
    .get(Post.index)
router
    .route('/add')
    .get(Post.add)
    .post(Post.create)
router
    .route('/:id')
    .get(Post.show)
router
    .route('/:id/edit')
    .get(Post.edit)
    .post(Post.update)
router
    .route('/:id/delete')
    .get(Post.delete)
module.exports = router;