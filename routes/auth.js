const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getAdminHasLoggedIn, setAdminHasLoggedIn } = require('../globals'); // Importar la variable global

// Mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  if (getAdminHasLoggedIn()) {
    req.flash('success_msg', 'El admin ya ha iniciado sesión.');
    return res.redirect('/admin/add-product');
  }
  res.render('admin-login', { adminHasLoggedIn: getAdminHasLoggedIn() });
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

    // Iniciar sesión y modificar la variable global
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      setAdminHasLoggedIn(true); // Modificar la variable global
      return res.redirect('/admin/add-product');
    });
  })(req, res, next);
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Has cerrado sesión');
  setAdminHasLoggedIn(false); // Resetear la variable global
  res.redirect('/');
});

module.exports = router;
