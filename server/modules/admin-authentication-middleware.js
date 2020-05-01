// This is something you can make & modify to reject users that 
// do not have a specific role.
const rejectNonAdmin = (req, res, next) => {
    // check if logged in
    if (req.isAuthenticated() && req.user.admin) {
      // They were authenticated! User may do the next thing
      // Note! They may not be Authorized to do all things
      next();
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  };
  
  module.exports = { rejectNonAdmin };