const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const { adminHasLoggedIn } = require('./globals');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000; // Usar el puerto de las variables de entorno

// Conectar a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Configuración de Passport
require('./config/passport')(passport);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos desde "uploads"

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Usar la clave secreta de las variables de entorno
    resave: true,
    saveUninitialized: true,
  })
);

// Inicializar Passport y flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales para mensajes flash y el estado del admin
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.adminHasLoggedIn = adminHasLoggedIn;
  next();
});

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', require('./routes/client'));
app.use('/admin', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});