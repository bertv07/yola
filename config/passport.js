const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Credenciales fijas
        const adminUsername = 'yolanday';
        const adminPassword = '12345678';

        // Verificar las credenciales
        if (username === adminUsername && password === adminPassword) {
          return done(null, { id: 10, username: adminUsername }); // Autenticación exitosa
        } else {
          return done(null, false, { message: 'Credenciales incorrectas' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    done(null, { id: 10, username: 'yolanday' }); // Simular un usuario
  });
};