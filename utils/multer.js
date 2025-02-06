const multer = require('multer');

const storage = multer.memoryStorage(); // Almacena las imágenes en memoria como Buffer
const upload = multer({ storage });

module.exports = upload;