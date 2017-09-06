'use strict';
module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },

  },
    {}
  );

  user.associate = function (models) {
    user.hasMany(models.post, { as: "posts", foreignKey: "userId" })
    user.hasMany(models.like, { as: "likes", foreignKey: "userId" })
  };
  return user;
};