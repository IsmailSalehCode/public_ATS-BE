const timeLimit = Number(process.env.ONE_ENTRY_PER_EMPLOYEE_TIME_LIMIT);
const { AttendanceEntry, Sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async validate(req, res, next) {
    try {
      // req.nfc_tag && req.employee are returned from NFCtagExists.js
      const nfc_tag = req.nfc_tag;
      const employee = req.employee;
      const employeeName = employee.name;
      const NFCtagID = nfc_tag.id;

      // Calculate the timestamp for specified ms ago
      const msAgo = new Date(Date.now() - timeLimit);

      // Check for existing entry for the same employee within the last hour
      const existingEntry = await AttendanceEntry.findOne({
        where: {
          NFCtagID: NFCtagID,
          createdAt: {
            [Op.gte]: msAgo, // Greater than or equal to oneHourAgo
          },
        },
      });

      // If an existing entry is found, prevent creating a new entry
      if (existingEntry) {
        return res.status(403).send({
          message:
            employeeName +
            ", a time-interval is set before you can make a new record.",
        });
      }

      // No existing entry found, proceed to create a new entry
      next();
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },
};

// Засечен е опит от един и същ работник да направи повторен запис. Моля изчакайте преди да направите нов запис.

//test status:
