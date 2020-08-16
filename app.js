let PORT = process.env.PORT || 3000;

const express = require('express');
const morgan = require('morgan'); // middleware package
const mongoose = require('mongoose');
const { render } = require('ejs');
const travelRoutes = require('./routes/travelRoutes');

// express app
const app = express();

// connect to MongoDB (mongodb+srv://<user>:<pw> ... <db>)
// mongoose est un Object Document Mapping library qui facilite la communication avec la DB
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.s1bu5.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT)) // on écoute les requêtes une fois seulement connecté à la DB
    .catch((err) => console.log(err)); // accolade supprime deprecation warning


// register view engine
app.set('view engine', 'ejs');

// middleware & static files (CSS, images dans le dossier 'public' rendu accessible au navigateur )
app.use(express.static('public'));
app.use(express.urlencoded({extended : true})); // prend les datas encodé dans l'URL par le formulaire et les passe dans un objet accessible dans req.body

app.use(morgan('dev')); 

// routes
// accueil (renvoi vers liste)
app.get('/', (req, res) => {
  res.redirect('/travels');
});

// à propos
app.get('/about', (req, res) => {
  res.render('about', { title: 'A propos' });
});

// travel route (middleware via router)
app.use('/travels', travelRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});