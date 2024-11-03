const { Kiosk, Sequelize } = require("../models");
const isUUIDv4 = require("./isUUIDv4");
const msgInvalidMachineId = "Invalid machine id!";
const { formatDBError } = require("../formatDBError");

module.exports = {
  async isEnabled(req, res, next) {
    //isAuthorized attaches kiosk object to req object;
    const rKiosk = req.kiosk;
    if (rKiosk.isEnabled == 0) {
      return res.status(403).send({
        message: "This machine is restricted from interacting with the server!",
      });
    } else {
      next();
    }
  },
  async existsKiosk(req, res, next) {
    try {
      const kioskId = req.query.kiosk_id || req.body.kiosk_id;
      const isValidUUIDv4 = isUUIDv4(kioskId);
      if (!kioskId || !isValidUUIDv4) {
        return res.status(400).send({
          message: msgInvalidMachineId,
        });
      }

      const rKiosk = await Kiosk.findOne({
        where: {
          id: kioskId,
        },
      });

      if (!rKiosk) {
        return res.status(400).send({
          message: msgInvalidMachineId,
        });
      }

      req.kiosk = rKiosk;
      //enabled kiosk found, move along
      next();
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
