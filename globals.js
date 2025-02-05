let adminHasLoggedIn = false;

module.exports = {
  getAdminHasLoggedIn: () => adminHasLoggedIn,
  setAdminHasLoggedIn: (value) => { adminHasLoggedIn = value; }
};
