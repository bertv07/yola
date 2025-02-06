const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb+srv://gleybert:V07020207@catalogo.tfnw7.mongodb.net/?retryWrites=true&w=majority&appName=catalogo', {
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de sesión
app.use(
  session({
    secret: '12345678', // Cambia esto por una cadena secreta segura
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://gleybert:V07020207@catalogo.tfnw7.mongodb.net/?retryWrites=true&w=majority&appName=catalogo' }),
    cookie: { secure: false } // Cambia a true si usas HTTPS
  })
);

// Inicializar Passport y flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales para mensajes flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', require('./routes/client'));
app.use('/admin', require('./routes/admin')); // Asegúrate de que esta línea esté presente
app.use('/auth', require('./routes/auth'));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});