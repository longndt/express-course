//check login only (no role)
const checkLoginSession = (req, res, next) => {
   if (req.session.username) {
      next();
   } else {
      res.redirect('/auth/login');
   }
}

module.exports = checkLoginSession;


//check multiple roles
const checkSession = (allowedRoles) => (req, res, next) => {
   if (req.session.username && allowedRoles.includes(req.session.role)) {
      next();
   } else {
      res.redirect('/auth/login');
   }
}

//check single role
const checkAdminSession = (req, res, next) => {
   if (req.session.username && req.session.role == 'admin') {
      next();
   }
   else {
      res.redirect('/auth/login');
      return;
   }
}

module.exports = {
   checkSession,
   checkAdminSession
}

