//utilisation de mongoose dans cette fichier 

const mongoose = require('mongoose'); //Mongoo bibliothèque Node.js fournit solution de modélisation d'objets MongoDB 

const AdminSchema = mongoose.Schema({ //définit la structure de vos données d'administration dans MongoDB
    username: {  //contient des champs
            type: String,
            unique: [true, 'The login is unique']
           
    },
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
//model exporté à la fin pour être utilisé dans d'autres parties, comme les contrôleurs