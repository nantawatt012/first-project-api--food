module.exports = (sequelize, DataTypes) => {
  const ProductPic = sequelize.define(
    "ProductPic",
    {
      pic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  ProductPic.associate = (db) => {
    ProductPic.belongsTo(
      db.Product,
      {
        foreignKey: { name: "productId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return ProductPic;
};
