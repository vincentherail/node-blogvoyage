const Travel = require('../models/travel');

const travel_index = (req, res) => {
    Travel.find().sort({createdAt : -1}) // classement descendant (-1) blog 2 au sommet de la page
    .then((result) => {
        res.render('travels/index', {title : 'Anecdotes', travels : result})  // injecte le résultat dans index.ejs
    })
    .catch((err) => {
        console.log(err);
    });
};

const travel_details = (req, res) => {
    const id = req.params.id;   // le paramètre id est récupéré grâce à :id
    
    Travel.findById(id)
    .then(result => {
        res.render('travels/details', {travel: result, title: "Détails de l'anecdote" });
    })
    .catch(err => {
        res.status(404).render('404', { title: '404' });
    })
};

const travel_create_get = (req, res) => {
    res.render('travels/create', { title: 'Nouveau' });
};

const travel_create_post = (req, res) => {
    const travel = new Travel(req.body);
    
    travel.save() // .save method sauvegarde l'enregistrement dans la DB
    .then((result) => {
        res.redirect('/travels')
    })
    .catch((err) => {
        console.log(err);
    })
};

const travel_delete = (req, res) => {
    const id = req.params.id; 

    Travel.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/travels'}); 
    })
    .catch(err => {
        console.log(err);
    })
};


module.exports = {
    travel_index, 
    travel_details, 
    travel_create_get, 
    travel_create_post, 
    travel_delete
}