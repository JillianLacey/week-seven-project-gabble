'use strict';
module.exports = function (sequelize, DataTypes) {
  var post = sequelize.define('post', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {

    });
  //this is where we do the joins. We deleted the class Methods.
  post.associate = function (models) {
    post.belongsTo(models.user, { as: "user", foreignKey: "userId" })
    post.hasMany(models.like, { as: "likes", foreignKey: "postId" })
  };
  return post;
};