const Panier = require('../models/panier.model.js');



// Create and Save a new panier
 exports.create = (req, res) => {
    // Validate request
   if (!req.body.idUser) {
        return res.status(400).send({
            message: "produits cannot be empty"
        });
    }

    // Create a panier
    const panier = new Panier({
        idUser: req.body.idUser,
        idProduit: req.body.idProduit,
        quantite: req.body.quantite,
    });

    // Save panier in the database
    panier.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the panier."
        });
    });
};

// Retrieve and return all paniers from the database.
exports.findAll = (req, res) => {
    Panier.find()
    .then(paniers => {
        res.send(paniers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving paniers."
        });
    });
};

// Find a single panier with a panierId
exports.findOne = (req, res) => {
    Panier.findById(req.params.panierId)
    .then(panier => {
        if (!panier) {
            return res.status(404).send({
                message: "panier not found with id " + req.params.panierId
            });
        }
        res.send(panier);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "panier not found with id " + req.params.panierId
            });
        }
        return res.status(500).send({
            message: "Error retrieving panier with id " + req.params.panierId
        });
    });
};

// Update a panier identified by the panierId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.idUser) {
        return res.status(400).send({
            message: "produits cannot be empty"
        });
    }

    // Find panier and update it with the request body
    Panier.findByIdAndUpdate(req.params.panierId, {
        idUser: req.body.idUser,
        idProduit: req.body.idProduit,
        quantite: req.body.quantite,
    }, { new: true })
    .then(panier => {
        if (!panier) {
            return res.status(404).send({
                message: "panier not found with id " + req.params.panierId
            });
        }
        res.send(panier);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "panier not found with id " + req.params.panierId
            });
        }
        return res.status(500).send({
            message: "Error updating panier with id " + req.params.panierId
        });
    });
};

// Delete a panier with the specified panierId in the request
exports.delete = (req, res) => {
    Panier.findByIdAndRemove(req.params.panierId)
    .then(panier => {
        if (!panier) {
            return res.status(404).send({
                message: "panier not found with id " + req.params.panierId
            });
        }
        res.send({ message: "panier deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "panier not found with id " + req.params.panierId
            });
        }
        return res.status(500).send({
            message: "Could not delete panier with id " + req.params.panierId
        });
    });
};
