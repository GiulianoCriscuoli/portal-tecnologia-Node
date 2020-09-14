const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categorie = new Schema({

    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        
    },
    date: {
        type: Date,
        require: true,
        default: Date.now()
    }

});

mongoose.model("categories", Categorie);