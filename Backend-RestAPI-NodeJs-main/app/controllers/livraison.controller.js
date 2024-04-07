const Livraison = require('../models/livraison.model.js');

// Create and Save a new livraison
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "livraison content can not be empty"
        });
    }

    // Create a livraison
    const livraison = new Livraison({
        username: req.body.username || "Untitled Livraison", 
        email : req.body.email,
        password: req.body.password
    });

    // Save livraison in the database
    livraison.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the livraison."
        });
    });
};

// Retrieve and return all livraison from the database.
exports.findAll = (req, res) => {
    Livraison.find()
    .then(livraisons => {
        res.send(livraisons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving livraisons."
        });
    });
};

// Find a single livraison with a livraisonId
exports.findOne = (req, res) => {
    Livraison.findById(req.params.livraisonId)
    .then(livraison => {
        if(!livraison) {
            return res.status(404).send({
                message: "livraison not found with id " + req.params.livraisonId
            });            
        }
        res.send(livraison);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "livraison not found with id " + req.params.livraisonId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving livraison with id " + req.params.livraisonId
        });
    });
};

// Update a livraison identified by the livraisonId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "livraison content can not be empty"
        });
    }

    // Find livraison and update it with the request body
    Livraison.findByIdAndUpdate(req.params.livraisonId, {
        username: req.body.username || "Untitled livraison", 
        email : req.body.email,
        password: req.body.password
    }, {new: true})
    .then(livraison => {
        if(!livraison) {
            return res.status(404).send({
                message: "livraison not found with id " + req.params.livraisonId
            });
        }
        res.send(livraison);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "livraison not found with id " + req.params.livraisonId
            });                
        }
        return res.status(500).send({
            message: "Error updating livraison with id " + req.params.livraisonId
        });
    });
};

// Delete a livraison with the specified livraisonId in the request
exports.delete = (req, res) => {
    Livraison.findByIdAndRemove(req.params.livraisonId)
    .then(livraison => {
        if(!livraison) {
            return res.status(404).send({
                message: "livraison not found with id " + req.params.livraisonId
            });
        }
        res.send({message: "livraison deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "livraison not found with id " + req.params.livraisonId
            });                
        }
        return res.status(500).send({
            message: "Could not delete livraison with id " + req.params.livraisonId
        });
    });
};
