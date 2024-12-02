module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      notes: {
        allowNull: true,
        type: DataTypes.STRING(50_000),
      },
      occupation: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(22),
      },
      assignedTasks: {
        allowNull: true,
        type: DataTypes.STRING(50_000),
      },
    },
    {
      tableName: "employees",
      timestamps: false,
    }
  );

  Employee.associate = function (models) {
    Employee.hasOne(models.NFCtag, {
      foreignKey: "employeeId",
      defaultValue: null,
      onDelete: "set null",
    });
  };

  return Employee;
};
