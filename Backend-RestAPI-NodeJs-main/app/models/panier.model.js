const mongoose = require('mongoose');


const PanierSchema = mongoose.Schema({
   
  idUser: String,
idProduit: String,
quantite: String
    }, 


{
    timestamps: true
});

module.exports = mongoose.model('Panier', PanierSchema);