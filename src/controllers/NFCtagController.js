const { NFCtag, Employee, Sequelize } = require("../models");
const { formatDBError } = require("../formatDBError");

module.exports = {
  async assignTagToEmployee(req, res) {
    const tag = req.nfc_tag;
    try {
      await tag.update({ employeeId: req.employee.id });
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async getAllUnassigned(req, res) {
    try {
      const entities = await NFCtag.findAll({
        where: {
          employeeId: null,
        },
      });
      return res.status(200).send(entities);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async getAllAssigned(req, res) {
    try {
      const entities = await NFCtag.findAll({
        where: {
          employeeId: {
            [Sequelize.Op.not]: null,
          },
        },
        include: [
          {
            model: Employee,
            attributes: ["name", "notes"],
          },
        ],
      });
      return res.status(200).send(entities);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async deleteOne(req, res) {
    try {
      const entityToDestroy = req.nfc_tag;

      await entityToDestroy.destroy();

      return res.sendStatus(204);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async addOne(req, res) {
    try {
      const newTagId = req.NFCtagId.toLowerCase();
      await NFCtag.create({
        id: newTagId,
      });
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
