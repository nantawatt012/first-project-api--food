module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define(
    "UserImage",
    {
      profileImage: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      coverImage: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },

    { underscored: true }
  );
  UserImage.associate = (db) => {
    UserImage.belongsTo(
      db.User,
      {
        foreignKey: { name: "userId" },
        allowNull: false
      },
      {
        onDelete: "RESTRICT"
      }
    );
  };

  return UserImage;
};
