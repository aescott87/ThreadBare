const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // User is authenticated and may proceed
    next();
  } else {
    // Not authenticated, send error
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
