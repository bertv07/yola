const express = require('express');
const router = express.Router();
const passport = require('passport');

// Mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    req.flash('success_msg', 'Ya has iniciado sesión.');
    return res.redirect('/admin/add-product');
  }
  res.render('admin-login');
});

// Procesar el inicio de sesión
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error_msg', info.message);
      return res.redirect('/auth/login');
    }

    // Iniciar sesión
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
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