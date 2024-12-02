const {
  AttendanceEntry,
  Kiosk,
  NFCtag,
  Employee,
  Sequelize,
} = require("../models");
const { formatDBError } = require("../formatDBError");

module.exports = {
  async getEachEmployeesATEs(req, res) {
    try {
      const data = await Employee.findAll({
        attributes: ["id", "name"],
        include: [
          {
            model: NFCtag,
            attributes: ["id"],
            include: [
              {
                model: AttendanceEntry,
                where: {
                  createdAt: {
                    [Sequelize.Op.between]: [req.startDate, req.endDate],
                  },
                },
                required: false,
                /**https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#:~:text=should%20add%20required%3A%20false.
                 */
              },
            ],
          },
        ],
      });
      return res.status(200).send(data);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async getAllATEs(req, res) {
    try {
      const entities = await AttendanceEntry.findAll({
        where: {
          createdAt: {
            [Sequelize.Op.between]: [req.startDate, req.endDate],
          },
        },
        include: [
          {
            model: Kiosk,
            attributes: ["id", "name"],
          },
          {
            model: NFCtag,
            include: [
              {
                model: Employee,
                attributes: ["name"],
              },
            ],
          },
        ],
        attributes: {
          exclude: ["kioskId", "NFCtagID"],
        },
        order: [["id", "DESC"]],
      });
      return res.status(200).send(entities);
      /** {"id": 1,
    "isWorking": 1,
    "createdAt": "2024-06-22T12:00:00.000Z",
    "Kiosk": {"name": "k1"},
    "NFCtag": {
        "id": "6d738fa1",
        "employeeId": 1, "Employee": {"name": "АДЕЛ ХАЛИЛ АЛСАЛЕМ"}}}
        }}}*/
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async deleteOne(req, res) {
    try {
      await AttendanceEntry.destroy({
        where: {
          id: req.attendanceEntryId,
        },
      });
      return res.sendStatus(204);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async editAttendanceEntry(req, res) {
    try {
      await AttendanceEntry.update(
        {
          isWorking: req.body.goes_to_work,
          NFCtagID: req.nfc_tag.id,
          kioskId: req.kiosk.id,
          createdAt: req.body.createdAt,
        },
        {
          where: {
            id: req.attendanceEntry.id,
          },
        }
      );
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async insertAttendanceEntry(req, res) {
    try {
      // req.nfc_tag && req.employee are returned from NFCtag middleware
      const nfc_tag = req.nfc_tag;
      const employee = req.employee;
      // req.kiosk is returned from KioskPolicy middleware
      const kioskId = req.kiosk.id;
      const goesToWork = req.body.goes_to_work;

      // because this func is also used by AT-Admin-Portal where the User inputs a createdAt date. In repo electron-FE, createdAt is absent from req.body.
      let createdAt = req.body.createdAt;
      if (!createdAt) {
        createdAt = new Date().setSeconds(0, 0);
      }

      const NFCtagID = nfc_tag.id;
      const newEntry = await AttendanceEntry.create({
        NFCtagID: NFCtagID,
        kioskId: kioskId,
        isWorking: goesToWork,
        createdAt: createdAt,
      });
      // Introduced a check for goesToWork- so that going to work twice in a row or take a break twice in a row raises a warning. An employee may have forgotten to create an Attendance Entry. Or an ATS user may be unaware.
      // The check is in a middleware function from AttendanceEntryPolicy.
      const warnIsWorkingFieldHasUnexpectedValue =
        req.body.warnIsWorkingFieldHasUnexpectedValue;

      return res.status(200).send({
        warnIsWorkingFieldHasUnexpectedValue:
          warnIsWorkingFieldHasUnexpectedValue,
        entry: {
          createdAt: newEntry.createdAt,
          isWorking: newEntry.isWorking,
        },
        employee: {
          name: employee.name,
          occupation: employee.occupation,
          assignedTasks: employee.assignedTasks,
        },
      });
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
