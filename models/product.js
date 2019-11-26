const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: String,
    product_description: String,
    category: String,
    product_img: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;