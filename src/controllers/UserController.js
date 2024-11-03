const { formatDBError } = require("../formatDBError");
const { User } = require("../models");

module.exports = {
  async hasUsers() {
    // used in app.js in order to determine whether DB should be reinitialized
    try {
      const count = await User.count();
      return count > 0;
    } catch (err) {
      const { status, message } = formatDBError(err);
      return new Error("Err status: " + status + " - " + message);
    }
  },
  async addUser(req, res) {
    try {
      const userToBeInserted = req.body;
      // Exclude the id field if it exists in req.body so that sequelize can autogenerate one.
      delete userToBeInserted.id;

      await User.create(userToBeInserted);
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },

  async getUsers(req, res) {
    try {
      let users = null;
      users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      return res.status(200).send(users);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },

  async deleteUser(req, res) {
    try {
      const userToDestroy = req.obj;

      await userToDestroy.destroy();

      return res.sendStatus(204);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },

  async editUser(req, res) {
    try {
      const userId = req.params.id;

      await User.update(req.body, {
        where: {
          id: userId,
        },
      });

      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async changePass(req, res) {
    try {
      const newPass = req.body.password;
      // injected into req from existsUser or isPRTValid
      const targetUser = req.obj;
      await targetUser.update({ password: newPass });
      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
