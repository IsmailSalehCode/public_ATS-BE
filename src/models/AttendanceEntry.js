module.exports = (sequelize, DataTypes) => {
  const AttendanceEntry = sequelize.define(
    "AttendanceEntry",
    {
      id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      isWorking: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.TINYINT,
      },
    },
    {
      tableName: "attendance_entries",
      timestamps: true,
      updatedAt: false,
    }
  );

  AttendanceEntry.associate = function (models) {
    AttendanceEntry.belongsTo(models.NFCtag, {
      foreignKey: "NFCtagID",
      defaultValue: null,
      onDelete: "set null",
    });
    AttendanceEntry.belongsTo(models.Kiosk, {
      foreignKey: "kioskId",
      defaultValue: null,
      onDelete: "set null",
    });
  };

  return AttendanceEntry;
};
