const express = require('express');
const router = express.Router();
const passport = require('passport');

// Mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  const adminHasLoggedIn = req.isAuthenticated && req.isAuthenticated();
  console.log('Accediendo a la ruta de login, adminHasLoggedIn:', adminHasLoggedIn);
  if (adminHasLoggedIn) {
    req.flash('success_msg', 'Ya has iniciado sesión.');
    return res.redirect('/admin/add-product');
  }
  res.render('admin-login', { adminHasLoggedIn });
});

// Procesar el inicio de sesión
router.post('/login', (req, res, next) => {
  console.log('Intentando iniciar sesión con:', req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error en Passport:', err);
      return next(err);
    }
    if (!user) {
      console.log('Autenticación fallida:', info.message);
      req.flash('error_msg', info.message);
      return res.redirect('/auth/login');
    }

    // Iniciar sesión
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        return next(err);
      }
      console.log('Inicio de sesión exitoso');
      return res.redirect('/admin/add-product');
    });
  })(req, res, next);
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Has cerrado sesión');
  res.redirect('/');
});

module.exports = router;
