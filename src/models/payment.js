module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      conpleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          notEmpty: true
        }
      },
      referenceImg: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      method: {
        type: DataTypes.ENUM("slip,visa")
      }
    },
    { underscored: true }
  );
  Payment.associate = (db) => {
    Payment.belongsTo(
      db.Order,
      {
        foreignKey: { name: "orderId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return Payment;
};
