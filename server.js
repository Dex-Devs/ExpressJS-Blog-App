const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose');

// router chunks
const blog_routers = require('./routers/blog_routes');

// SETTING UP
const PORT = process.env.PORT || 3000;

// EXPRESS APP INSTANTIATION
const app = express();

// env vars 
require("dotenv").config();

// REQUEST DATA PARSERS - for json and urlencoded data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// connect to db

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(connected => {
        // accept requests upon successful db connection
        app.listen(PORT, () => console.log("Server is listening to port ", PORT) )
    })
    .catch(err => {
        console.log(err)
        console.log("There's a problem connecting to the database.");
    })

// VIEW ENGINE -- EJS
// register view engine 
app.set('view engine', 'ejs');

// EJS automatically looks in the 'views' folder by default and read ejs files from it
/* 
    IF YOU WANT TO USE CREATE A DIFF DIR FOR YOUR VIEW TEMPLATES, YOU NEED TO SPECIFY WHERE EJS COULD LOOK IT UP ---- 
    app.set(views[default], your own specified folder)
*/
app.set('views', 'ejs_views');

// STATIC FILES MIDDLEWARE
// middleware for static files
// tell node to look up static files in the arg specified by default
app.use(express.static('public'));

// SOME TOOLS HERE

// morgan logger -- logging TOOL - awsm
app.use(morgan('dev'))

// get request -- RENDER VIEW with EJS
/* app.get('/',async(req, res) => {
    // res.render('index');

    // passing dynamic data from request handlers to VIEW
    let data
    try {
        data = await readFile();
    }catch(e) {
        console.log("ERROR : ", e);
    }
    
    if(data) {
        const blogs = data.map(e => {
            return {id: e.id, title: e.title, body: e.body};
        });
        res.render('index', {title: 'Home', blogs: blogs});
    }
}) */

// BASE ROUTES
// index ui
app.get('/', (req, res) => {
    // redirect
    res.redirect('/blogs');
})
// about ui
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

// BLOG ROUTES
app.use('/blogs',blog_routers); // make router middleware scoped out in /blogs

// UNKNOWN ROUTE HANDLER
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error'});
})