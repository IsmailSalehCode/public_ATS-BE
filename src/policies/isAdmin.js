const passport = require("passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", function (err, user) {
    if (!user.isAdmin) {
      return res.status(401).send("Action is intended for admins only.");
    } else {
      // req.user = user; <= I can do that, but i don't need to at this point.
      next();
    }
  })(req, res, next);
};
