const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    nom: {
            type: String,
            unique: [true, 'The login is unique']
    },
    prix: String,
    quantite:String,
    image:String,
    categorie:String,
    sCategorie:String,
    description:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Produit', ProduitSchema);
