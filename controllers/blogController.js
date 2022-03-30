const Blog = require('../models/blog');

// blog_index, blog_details, blog_create_get, blog_add, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render('index', {title: `All Blogs`, blogs: result});
        })
        .catch(err => {
            throw err;
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {title: 'Blog Details', blog: result})
        })
        .catch(err => {
            res.status(404).render('404', {title: 'Blog Not Found'})
        })
}

const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create Blog'});
}

const blog_add = (req, res) => {
    // mongo model instance
    const blogIt = new Blog(req.body);

    blogIt.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch(err => {
            throw err;
        })
}

const blog_delete =  (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(response => {
            // respond with json data with redirection endpoint prop
            // do redirection on the client side
            res.json({redirect: '/blogs', deletion_stat: 'Blog Successfully Deleted!'});
        })
        .catch(err => {
            throw err;
        })
}

module.exports = {
    blog_index, 
    blog_details, 
    blog_create_get,
    blog_add, 
    blog_delete
}