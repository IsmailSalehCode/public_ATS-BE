module.exports = (sequelize, DataTypes) => {
  const NFCtag = sequelize.define(
    "NFCtag",
    {
      id: {
        allowNull: false,
        type: DataTypes.STRING(20),
        primaryKey: true,
        autoIncrement: false,
      },
    },
    {
      tableName: "nfc_tags",
      timestamps: false,
    }
  );

  NFCtag.associate = function (models) {
    NFCtag.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      defaultValue: null,
      onDelete: "set null",
    });
    NFCtag.hasMany(models.AttendanceEntry, {
      foreignKey: "NFCtagID",
      defaultValue: null,
      onDelete: "set null",
    });
  };

  return NFCtag;
};
