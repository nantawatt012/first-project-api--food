module.exports = (sequelize, DataTypes) => {
  const OrderHistory = sequelize.define(
    "OrderHistory",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  OrderHistory.associate = (db) => {
    OrderHistory.belongsTo(
      db.Order,
      {
        foreignKey: { name: "orderId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    OrderHistory.belongsTo(
      db.Product,
      { foreignKey: { name: "productId" }, allowNull: false },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return OrderHistory;
};
