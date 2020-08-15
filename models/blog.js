const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// le schéma définit la structure du document
const blogSchema  = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, {timestamps:true});

// le modèle fournit une interface permettant de communiquer avec la DB collection 
// il va chercher le nom entre parenthèse et le pluraliser pour le chercher dans la DB collection (ici : Blogs)
const Blog = mongoose.model('Blog', blogSchema);
module.exports= Blog;