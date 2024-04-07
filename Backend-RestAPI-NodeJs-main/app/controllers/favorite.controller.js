const Favorite = require("../models/favorite.model.js");

// Create and Save a new favorite
exports.create = (req, res) => {
  // Validate request
  if (!req.body.produit) {
    return res.status(400).send({
      message: "favorite content can not be empty",
    });
  }

  // Create a favorite
  const favorite = new Favorite({
    produit: req.body. produit ,
   user: req.body.user,
  });

  // Save favorite in the database
  favorite.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the favorite.",
      });
    });
};

// Retrieve and return all favorite from the database.
exports.findAll = (req, res) => {
  Favorite.find()
    .then((favorite) => {
      res.send(favorite);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving favorites.",
      });
    });
};

// Find a single favorite with a favoriteId
exports.findOne = (req, res) => {
  Favorite.findById(req.params.favoriteId)
    .then((favorite) => {
      if (!favorite) {
        return res.status(404).send({
          message: "favorite not found with id " + req.params.favoriteId,
        });
      }
      res.send(favorite);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "favorite not found with id " + req.params.favoriteId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving   with id " + req.params.favoriteId,
      });
    });
};

// Update a favorite identified by the favoriteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "favorite content can not be empty",
    });
  }

  // Find favorite and update it with the request body
  Favorite.findByIdAndUpdate(
    req.params.favoriteId,
    {
      produit : req.body. produit  ,
      user: req.body.user,
     
    },
    { new: true }
  )
    .then((favorite) => {
      if (!favorite) {
        return res.status(404).send({
          message: "favorite not found with id " + req.params.favoriteId,
        });
      }
      res.send(favorite);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "favorite not found with id " + req.params.favoriteId,
        });
      }
      return res.status(500).send({
        message: "Error updating favorite with id " + req.params.favoriteId,
      });
    });
};

// Delete a favorite with the specified favoriteId in the request
exports.delete = (req, res) => {
  Favorite.findByIdAndRemove(req.params.favoriteId)
    .then((favorite) => {
      if (!favorite) {
        return res.status(404).send({
          message: "favorite not found with id " + req.params.favoriteId,
        });
      }
      res.send({ message: "favorite deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "favorite not found with id " + req.params.favoriteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete favorite with id " + req.params.favoriteId,
      });
    });
};
