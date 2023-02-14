const { PRODUCT_TYPE_FOOD } = require("../config/constant");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      type: {
        type: DataTypes.ENUM(PRODUCT_TYPE_FOOD, "snag"),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      itemLeft: {
        type: DataTypes.INTEGER
      }
    },
    { underscored: true }
  );
  Product.associate = (db) => {
    Product.belongsTo(
      db.User,
      {
        foreignKey: { name: "userId" },
        allowNull: false
      },
      {
        onDelete: "CASCADE"
      }
    );

    Product.hasMany(
      db.ProductPic,
      {
        foreignKey: { name: "productId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    Product.hasMany(
      db.Cart,
      {
        foreignKey: { name: "productId" },
        allowNull: false
      },
      {
        onDelete: "CASCADE"
      }
    );

    Product.hasMany(
      db.OrderHistory,
      { foreignKey: { name: "productId" }, allowNull: false },
      { onDelete: "RESTRICT" }
    );
  };
  return Product;
};
