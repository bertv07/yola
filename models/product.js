const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  images: [
    {
      data: Buffer, // Almacena los datos binarios de la imagen
      contentType: String, // Almacena el tipo de imagen (por ejemplo, 'image/jpeg')
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);