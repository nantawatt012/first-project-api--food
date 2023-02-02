module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {}, { underscored: true });
  Order.associate = (db) => {
    Order.belongsTo(
      db.Address,
      {
        foreignKey: { name: "addressId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    Order.hasMany(
      db.Payment,
      {
        foreignKey: { name: "orderId" },
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
