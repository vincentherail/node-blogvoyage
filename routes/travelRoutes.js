    const express = require('express');
    const travelController = require('../controllers/travelControllers');

    const router = express.Router();    // le router fait office de mini app

    // liste de toutes les anecdotes
    router.get('/', travelController.travel_index);

    // rédiger une anecdote 
    router.get('/create', travelController.travel_create_get);
    
    // afficher une anecdote
    router.get('/:id', travelController.travel_details);

    // enregistrer une anecdote
    router.post('/', travelController.travel_create_post);

    //supprimer une anecdote
    router.delete('/:id', travelController.travel_delete);

    module.exports = router;