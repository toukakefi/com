// Importation des modules

const express = require('express'); // Importation du module Express.js pour la création de l'application web 
var cors = require('cors') // Importation du module CORS pour autoriser les requêtes cross-origin
const bodyParser = require('body-parser');// Importation du module body-parser pour analyser les données des requêtes HTTP

// create express app
const app = express();  // Initialisation de l'application Express
app.use(cors())  // Activation de CORS pour permettre les requêtes cross-origin


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js'); // Importation du fichier de configuration de la base de données
const mongoose = require('mongoose'); // Importation du module Mongoose pour interagir avec MongoDB

mongoose.Promise = global.Promise; // Utilisation des promesses globales pour gérer les opérations asynchrones de Mongoose

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Rest API By Chaaben Group."});
});

// Importation et utilisation des routes pour différentes parties de l'application
require('./app/routes/admin.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/produit.routes.js')(app);
require('./app/routes/panier.routes.js')(app);
require('./app/routes/commande.routes.js')(app);
require('./app/routes/livraison.routes.js')(app);
require('./app/routes/categorie.routes.js')(app);
require('./app/routes/favorite.routes.js')(app);


// listen for requests
app.listen(3000,   () => {
    console.log("Server is listening on port 3000");
});