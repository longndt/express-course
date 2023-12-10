//check login only
const checkLoginSession = (req, res, next) => {
   if (req.session.username) {
      next();
   } else {
      res.redirect('/auth/login');
   }
}

//check single role
const checkSingleSession = (req, res, next) => {
   if (req.session.username && req.session.role == 'admin') {
      next();
   }
   else {
      res.redirect('/auth/login');
      return;
   }
}

//check multiple roles
const checkMultipleSession = (allowedRoles) => (req, res, next) => {
   if (req.session.username && allowedRoles.includes(req.session.role)) {
      next();
   } else {
      res.redirect('/auth/login');
   }
}

module.exports = {
   checkLoginSession,
   checkSingleSession,
   checkMultipleSession
}

