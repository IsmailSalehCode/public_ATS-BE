module.exports = (sequelize, DataTypes) => {
  const Kiosk = sequelize.define(
    "Kiosk",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // user can name his kiosks
      name: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: true,
      },
      details: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      // is the kiosk allowed to make requests?
      isEnabled: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      shouldResetLocalDBOnStartup: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      tableName: "kiosks",
      timestamps: false,
    }
  );

  Kiosk.associate = function (models) {
    Kiosk.hasMany(models.AttendanceEntry, {
      foreignKey: "kioskId",
      defaultValue: null,
      onDelete: "set null",
    });
  };

  return Kiosk;
};
