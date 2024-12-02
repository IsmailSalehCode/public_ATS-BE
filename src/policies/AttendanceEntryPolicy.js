const { formatDBError } = require("../formatDBError");
const { AttendanceEntry } = require("../models");
const isNumber = require("./isNumber");

module.exports = {
  async isAttendanceEntryIdValid(req, res, next) {
    const ateId = req.params.attendanceEntryId;
    const isIdValid = isNumber(ateId);
    if (!isIdValid) {
      return res.status(400).send("Invalid ATE id.");
    }
    req.attendanceEntryId = ateId;
    next();
  },
  async existsAttendanceEntry(req, res, next) {
    //  always preceeded by isAttendanceEntryIdValid, which includes attendanceEntryId in the req object
    const ate = await AttendanceEntry.findOne({
      where: { id: req.attendanceEntryId },
    });

    if (!ate) {
      return res
        .status(404)
        .send("This Attendance Entry has been deleted! Refresh your data.");
    }

    req.attendanceEntry = ate;
    next();
  },
  async previousAttendanceEntryIsWorkingFieldHasUnexpectedValue(
    req,
    res,
    next
  ) {
    // req.nfc_tag && req.employee are returned from NFCtag middleware
    // req.kiosk is returned from KioskPolicy middleware
    const NFCtagId = req.nfc_tag.id;
    const kioskId = req.kiosk.id;
    let lastEntry;
    try {
      lastEntry = await AttendanceEntry.findOne({
        where: {
          NFCtagID: NFCtagId,
          kioskId: kioskId,
        },
        // ordering by createdAt desc retrieves wrong lastEntry. Probably cuz i got rid of seconds.
        order: [["id", "DESC"]],
      });
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
    if (!lastEntry) {
      // no previous entry -> no unexpected value
      return next();
    }
    console.log("=================================================");
    const previousIsWorking = Number(lastEntry.isWorking);
    console.log("previousIsWorking");
    console.log(previousIsWorking);
    const toBeInsertedIsWorking = Number(req.body.goes_to_work);
    console.log("toBeInsertedIsWorking");
    console.log(toBeInsertedIsWorking);
    console.log("=================================================");
    const isUnexpected = previousIsWorking === toBeInsertedIsWorking;
    req.body.warnIsWorkingFieldHasUnexpectedValue = isUnexpected;
    return next();
  },
};
