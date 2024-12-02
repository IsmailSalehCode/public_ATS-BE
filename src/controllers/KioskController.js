const { formatDBError } = require("../formatDBError");
const { Kiosk, AttendanceEntry, Sequelize } = require("../models");

//KioskPolicy attaches Kiosk object to req object.
module.exports = {
  async getStartUpVars(req, res) {
    try {
      const kiosk = req.kiosk;
      const kioskName = req.kiosk.name;
      const shouldResetLocalDBOnStartup = kiosk.shouldResetLocalDBOnStartup;
      await res
        .status(200)
        .send({
          name: kioskName,
          shouldResetLocalDBOnStartup: shouldResetLocalDBOnStartup,
        });
      // turn off shouldResetLocalDBOnStartup if it is true
      if (shouldResetLocalDBOnStartup === 1) {
        await kiosk.update({ shouldResetLocalDBOnStartup: 0 });
      }
      return;
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async getAll(req, res) {
    try {
      const entities = await Kiosk.findAll({
        attributes: {
          include: [
            [
              Sequelize.fn("COUNT", Sequelize.col("AttendanceEntries.id")),
              "attendanceEntryCount",
            ],
          ],
        },
        include: [
          {
            model: AttendanceEntry,
            as: "AttendanceEntries",
            attributes: [], // Exclude all attributes of AttendanceEntry
          },
        ],
        group: ["Kiosk.id"], // Group by Kiosk.id to count attendance entries per Kiosk
      });
      return res.status(200).send(entities);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async deleteOne(req, res) {
    try {
      const entityToDestroy = req.kiosk;

      await entityToDestroy.destroy();

      return res.sendStatus(204);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async edit(req, res) {
    try {
      const entityId = req.kiosk.id;

      await Kiosk.update(req.body, {
        where: {
          id: entityId,
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
      await Kiosk.create(entityToBeInserted);
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
