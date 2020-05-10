// Rejects users that 
// do not have an admin role.
const rejectNonAdmin = (req, res, next) => {
    // check if logged in and assigned as an admin
    if (req.isAuthenticated() && req.user.admin) {
      // They were authenticated and authorized
      next();
    } else {
      // if not authorized
      res.sendStatus(403);
    }
  };
  
  module.exports = { rejectNonAdmin };