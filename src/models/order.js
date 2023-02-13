module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      sumAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validator: {
          notEmpty: true
        }
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { underscored: true }
  );
  Order.associate = (db) => {
    Order.belongsTo(
      db.User,
      {
        foreignKey: { name: "userId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    Order.hasMany(
      db.OrderHistory,
      {
        foreignKey: { name: "orderId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return Order;
};
