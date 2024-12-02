const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = Number(process.env.SALT_ROUNDS);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      password: {
        // bcrypt requires this legnth for the password hash
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(22),
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      isEnabled: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
      },
      passwordResetTokenEXP: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, saltRounds);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
      },
    }
  );

  User.prototype.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
    // return password == this.password;
  };
  User.prototype.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetTokenEXP = Date.now() + 10 * 60 * 1000;

    return resetToken;
  };
  return User;
};
