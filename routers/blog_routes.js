const express = require('express');
const router = express.Router(); // router instance
const BlogController = require('../controllers/blogController'); // use model

// all blogs ui -- index redirect
router.get('/', BlogController.blog_index)
// create blog ui
router.get('/create', BlogController.blog_create_get)
// create blog
router.post('/', BlogController.blog_add)

// PARAM'd ROUTES
// get specific blog
router.get('/:id', BlogController.blog_details)
// delete a blog
router.delete('/:id', BlogController.blog_delete);

module.exports = router;