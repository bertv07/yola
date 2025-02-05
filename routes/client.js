const express = require('express');
const router = express.Router();
const Product = require('../models/product');

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

// Mostrar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const adminHasLoggedIn = req.isAuthenticated && req.isAuthenticated();
    res.render('index', { products, getCssColor, adminHasLoggedIn });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = router;
