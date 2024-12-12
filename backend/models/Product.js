const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  category: String,
  price: Number,
  dateOfSale: Date,
  sold: Boolean
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
