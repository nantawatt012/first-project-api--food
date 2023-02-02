module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("customer", "seller", "admin"),
        allowNull: false
      },
      profileImage: DataTypes.STRING,
      profileCover: DataTypes.STRING,
      discountId: DataTypes.STRING
    },
    { underscored: true }
  );

  User.associate = (db) => {
    User.hasMany(
      db.Address,
      {
        foreignKey: { name: "UserId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    User.hasMany(
      db.Product,
      {
        foreignKey: { name: "UserId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    User.hasMany(
      db.Cart,
      {
        foreignKey: { name: "UserId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return User;
};
