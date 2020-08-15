let PORT = process.env.PORT || 3000;

const express = require('express');
const morgan = require('morgan'); // middleware package
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to MongoDB (user:pw ... dbname)
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.s1bu5.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT)) // on écoute les requêtes une fois seulement connecté à la DB
    .catch((err) => console.log(err)); // accolade supprime deprecation warning


// register view engine
app.set('view engine', 'ejs');

// middleware & static files (CSS, images dans le dossier 'public' rendu accessible au navigateur )
app.use(express.static('public'));

app.use(morgan('dev')); 

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt : -1}) // classement descendant (-1) blog 2 au sommet de la page
        .then((result) => {
            res.render('index', {title : 'All blogs', blogs : result})  // injecte le résultat dans index.ejs
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});