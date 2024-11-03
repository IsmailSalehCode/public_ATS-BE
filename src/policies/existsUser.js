const { User } = require("../models");
const isUUIDv4 = require("./isUUIDv4");
module.exports = async function (req, res, next) {
  const objId = req.params.id;
  const isValidUUIDv4 = isUUIDv4(objId);

  if (!objId || !isValidUUIDv4) {
    return res.status(400).send("Invalid user id.");
  }

  const obj = await User.findByPk(objId);
  if (obj == null) {
    return res
      .status(404)
      .send("Selected user doesn't exist. Try refreshing your table.");
  } else {
    req.obj = obj;
    return next();
  }
};
