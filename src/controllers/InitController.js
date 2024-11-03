const { formatDBError } = require("../formatDBError");
const {
  User,
  Kiosk,
  NFCtag,
  Employee,
  AttendanceEntry,
  sequelize,
} = require("../models");
const NODE_ENV = process.env.NODE_ENV || "development";
const {
  users,
  kiosks,
  employees,
  nfcTags,
  attendanceEntries,
} = require(`../data/${NODE_ENV}`);

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("DB connection successful.");
    await sequelize.sync({ force: true }); // All tables dropped and recreated.
    console.log("DB force synced.");
    for (let i = 0; i < users.length; i++) {
      const userToBeInserted = users[i];
      await User.create(userToBeInserted); //using a hook in the User model. bulkCreate requires a different hook.
    }
    await Kiosk.bulkCreate(kiosks);
    await Employee.bulkCreate(employees);
    await NFCtag.bulkCreate(nfcTags);
    if (attendanceEntries) {
      await AttendanceEntry.bulkCreate(attendanceEntries);
    }
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  async reinitDB() {
    try {
      await initDB();
      console.log("Successful init! ==========");
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
