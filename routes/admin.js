const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const upload = require('../utils/multer');
const { ensureAuthenticated } = require('../config/auth');

// Mapa de colores
const colorMap = {
  rojo: 'red',
  azul: 'blue',
  verde: 'green',
  amarillo: 'yellow',
  naranja: 'orange',
  morado: 'purple',
  rosa: 'pink',
  gris: 'gray',
  negro: 'black',
  blanco: 'white',
  turquesa: 'turquoise',
  cyan: 'cyan',
  magenta: 'magenta',
  marron: 'brown',
  beige: 'beige',
  coral: 'coral',
  oro: 'gold',
  plata: 'silver',
  bronce: 'bronze',
  lavanda: 'lavender',
  oliva: 'olive',
  verdeLima: 'lime',
  verdeOscuro: 'darkgreen',
  azulClaro: 'lightblue',
  azulOscuro: 'darkblue',
  rojoOscuro: 'darkred',
  amarilloOscuro: 'darkgoldenrod',
  violeta: 'violet',
  indigo: 'indigo',
  salmon: 'salmon',
  verdeMenta: 'mintcream',
  verdeMar: 'seagreen',
  verdeBosque: 'forestgreen',
  verdeOlivaOscuro: 'darkolivegreen',
  azulCielo: 'skyblue',
  azulAcero: 'steelblue',
  azulMedianoche: 'midnightblue',
  rojoTomate: 'tomato',
  rojoCoral: 'coral',
  rojoFuego: 'firebrick',
  rojoCarmin: 'crimson',
  rojoRubi: 'ruby',
  rojoSangre: 'darkred',
  amarilloCanario: 'yellow',
  amarilloOro: 'gold',
  amarilloMostaza: 'darkkhaki',
  naranjaOscuro: 'darkorange',
  naranjaQuemado: 'burlywood',
  moradoOscuro: 'darkmagenta',
  moradoClaro: 'mediumpurple',
  rosaClaro: 'lightpink',
  rosaOscuro: 'deeppink',
  grisClaro: 'lightgray',
  grisOscuro: 'darkslategray',
  negroCarbón: 'black',
  blancoHueso: 'ivory',
  blancoFantasma: 'ghostwhite',
  blancoNieve: 'snow',
  blancoLino: 'linen',
  blancoAntiguo: 'antiquewhite',
  blancoFloral: 'floralwhite',
  blancoConcha: 'seashell',
  blancoHumo: 'whitesmoke',
  blancoMiel: 'honeydew',
  blancoAzulado: 'aliceblue',
  blancoLavanda: 'lavenderblush',
  blancoMenta: 'mintcream',
  blancoCoral: 'mistyrose',
  blancoCielo: 'azure',
  blancoPerla: 'pearl',
  blancoCremoso: 'cream',
  blancoMarfil: 'ivory',
  blancoRoto: 'oldlace',
  blancoPapel: 'papayawhip',
  blancoCera: 'wheat',
  blancoMaiz: 'cornflowerblue',
};

// Función para obtener el color CSS
const getCssColor = (color) => colorMap[color.toLowerCase()] || color;

// Mostrar el panel de administración
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin-dashboard', { products, getCssColor });
  } catch (err) {
    req.flash('error_msg', 'Error al obtener los productos');
    res.redirect('/admin/dashboard');
  }
});

// Mostrar el formulario para agregar productos
router.get('/add-product', ensureAuthenticated, (req, res) => {
  res.render('product-form');
});

// Agregar un nuevo producto
router.post('/add-product', ensureAuthenticated, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, stock, colors } = req.body;

    const colorsArray = typeof colors === 'string' ? colors.split(',') : colors;
    const images = req.files.map(file => ({
      data: file.buffer, // Datos binarios de la imagen
      contentType: file.mimetype, // Tipo de imagen (por ejemplo, 'image/jpeg')
    }));

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      colors: colorsArray,
      images,
    });

    await newProduct.save();
    req.flash('success_msg', 'Producto agregado correctamente');
    res.redirect('/admin/dashboard');
  } catch (err) {
    req.flash('error_msg', 'Error al agregar el producto');
    res.redirect('/admin/add-product');
  }
});

// Eliminar un producto
router.post('/delete-product/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Producto eliminado correctamente');
  } catch (err) {
    req.flash('error_msg', 'Error al eliminar el producto');
  }
  res.redirect('/admin/dashboard');
});

// Mostrar el formulario para actualizar un producto
router.get('/update-product/:id', ensureAuthenticated, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('update-form', { product });
  } catch (err) {
    req.flash('error_msg', 'Error al obtener el producto');
    res.redirect('/admin/dashboard');
  }
});

// Actualizar un producto
router.post('/update-product/:id', ensureAuthenticated, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, stock, colors } = req.body;

    const colorsArray = typeof colors === 'string' ? colors.split(',') : colors;
    const images = req.files.map(file => ({
      data: file.buffer, // Datos binarios de la imagen
      contentType: file.mimetype, // Tipo de imagen (por ejemplo, 'image/jpeg')
    }));

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        colors: colorsArray,
        $push: { images: { $each: images } }, // Agregar nuevas imágenes
      },
      { new: true }
    );

    req.flash('success_msg', 'Producto actualizado correctamente');
    res.redirect('/admin/dashboard');
  } catch (err) {
    req.flash('error_msg', 'Error al actualizar el producto');
    res.redirect(`/admin/update-product/${req.params.id}`);
  }
});

module.exports = router;