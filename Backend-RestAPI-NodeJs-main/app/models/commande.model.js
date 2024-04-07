const mongoose = require('mongoose');

const CommandeSchema = mongoose.Schema({
  idUser: String,
  commande: String,
  total: String,
  status: String,
          
    }, 

 {
    timestamps: true
});

module.exports = mongoose.model('Commande', CommandeSchema );