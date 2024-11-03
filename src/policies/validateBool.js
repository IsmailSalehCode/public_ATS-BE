const msgFailed = "Missing or invalid field.";

function isValidBoolean(pBool) {
  // if (pBool === null || pBool === undefined) {
  //   return false;
  // } this ain't needed
  // AT-Admin-Portal goes_to_work is either a 1 or 0; i want all systems which interact with this BE to contain either a 1 or 0 for goes_to_work
  const allowedValuesRegex = /^(1|0)$/;

  return allowedValuesRegex.test(pBool);
}

module.exports = {
  async goesToWorkInBody(req, res, next) {
    const strGoesToWork = req.body.goes_to_work;
    if (isValidBoolean(strGoesToWork) === false) {
      return res.status(400).send(msgFailed);
    }
    next();
  },
};
