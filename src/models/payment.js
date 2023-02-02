module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      method: {
        type: DataTypes.ENUM("QR", "SLIP")
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
