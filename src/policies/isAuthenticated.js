const passport = require("passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", function (err, user, info) {
    /**If an authorized client deletes his browsers' data, he may still be in a logged in state on the website. He would reach the isAuthenticated middleware at some point and the following runtime error occurs: TypeError: Cannot read property 'message' of null
    at /home/relafzhz/nodejs/ateAPI/src/policies/isAuthenticated.js:6:25
    at allFailed (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport/lib/middleware/authenticate.js:110:18)
    at attempt (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport/lib/middleware/authenticate.js:183:28)
    at JwtStrategy.strategy.fail (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport/lib/middleware/authenticate.js:314:9)
    at /home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport-jwt/lib/strategy.js:106:33
    at Object.module.exports [as verify] (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/jsonwebtoken/verify.js:70:12)
    at Function.module.exports [as JwtVerifier] (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport-jwt/lib/verify_jwt.js:4:16)
    at /home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport-jwt/lib/strategy.js:104:25
    at JwtStrategy._secretOrKeyProvider (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport-jwt/lib/strategy.js:40:13)
    at JwtStrategy.authenticate (/home/relafzhz/nodevenv/nodejs/ateAPI/14/lib/node_modules/passport-jwt/lib/strategy.js:99:10)
    
    On the frontend he gets the following v-alert: Error 500: <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Internal Server Error</pre> </body> </html>
    
    FIXED!*/
    if (err || !user) {
      let message = "Authentication failed!";
      if (info && info.message) {
        message = info.message;
        message = message.concat(" | Try logging out and logging in again.");
      } else if (err) {
        message = err.message;
      }
      console.log("=== AUTHENTICATION FAILURE ===");
      console.log(info || err);
      console.log("=== END AUTHENTICATION FAILURE ===");
      return res.status(401).send(message);
    }

    next();
  })(req, res, next);
};
