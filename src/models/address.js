module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      post: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  Address.associate = (db) => {
    Address.belongsTo(
      db.User,
      {
        foreignKey: { name: "userId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );

    Address.hasMany(
      db.Order,
      {
        foreignKey: { name: "addressId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };
  return Address;
};
