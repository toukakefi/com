const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema(
  {
    produit:String ,
    user:String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
