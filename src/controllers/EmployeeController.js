const { formatDBError } = require("../formatDBError");
const { Employee, NFCtag, AttendanceEntry, Sequelize } = require("../models");
const config = require("../config/config");

module.exports = {
  async getAll(req, res) {
    try {
      const entities = await Employee.findAll({
        attributes: { include: [[Sequelize.col("NFCtag.id"), "NFCtagId"]] },
        include: [
          {
            model: NFCtag,
            attributes: [],
            // include: {
            //   model: AttendanceEntry,
            //   attributes: {
            //     exclude: ["NFCtagID"],
            //   },
            //   include: {
            //     model: Kiosk,
            //     attributes: ["name"],
            //   },
            // },
          },
        ],
      });
      return res.status(200).send(entities);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async unassignTagAndDeleteAssociatedATEs(req, res) {
    const t = await config.db.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    //1) unassign tag, 2) del associated ATEs
    const employee = req.employee;
    try {
      // get associated nfc tag id.
      const nfcTag = await NFCtag.findOne(
        {
          where: { employeeId: employee.id },
        },
        { transaction: t }
      );
      if (!nfcTag) {
        await t.commit();
        return res
          .status(404)
          .send("Employee's NFC tag not found! Try refresing.");
      }
      // release tag's association with the employee
      nfcTag.employeeId = null;
      await nfcTag.save({ transaction: t });

      //delete tag's associated ATEs
      await AttendanceEntry.destroy(
        {
          where: {
            NFCtagID: nfcTag.id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      return res.sendStatus(204);
    } catch (err) {
      await t.rollback();
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async deleteEmployeeAndAssociatedATEs(req, res) {
    // Here I will need a transaction so that 1) I del associated ATEs.; 2) I del the employee.
    const t = await config.db.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    const employee = req.employee;
    try {
      // get associated nfc tag id.
      const nfcTag = await NFCtag.findOne(
        {
          where: { employeeId: employee.id },
        },
        { transaction: t }
      );
      await employee.destroy({ transaction: t });

      // If no NFC tag is found, commit the transaction and return a notice
      if (!nfcTag) {
        await t.commit();
        return res
          .status(200)
          .send(
            "Employee's NFC tag not found! Deleted only the employee without any associated Attendance Entries."
          );
      }
      // Delete associated Attendance Entries
      await AttendanceEntry.destroy(
        {
          where: {
            NFCtagID: nfcTag.id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      return res.sendStatus(204);
    } catch (err) {
      await t.rollback();
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },

  async edit(req, res) {
    try {
      await Employee.update(req.body, {
        where: {
          id: req.employee.id,
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async addOne(req, res) {
    try {
      const entityToBeInserted = req.body;
      // Exclude the id field if it exists in req.body so that sequelize can autogenerate one.
      delete entityToBeInserted.id;
      await Employee.create(entityToBeInserted);
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
