const { Employee } = require("../models");
const isNumber = require("./isNumber");
module.exports = async function (req, res, next) {
  const objId = req.params.employeeId;
  const isValid = isNumber(objId);
  console.log(objId, isValid);
  if (!objId || !isValid) {
    return res.status(400).send("Invalid employee id.");
  }

  const obj = await Employee.findByPk(objId);
  if (obj == null) {
    return res
      .status(404)
      .send(
        "This employee has been deleted by somebody else! Refresh your employee table."
      );
  } else {
    req.employee = obj;
    return next();
  }
};
