const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: 
      {
        type: String,
        required: false,
      },
    
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
