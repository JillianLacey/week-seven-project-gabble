'use strict';
module.exports = function (sequelize, DataTypes) {
  var like = sequelize.define('like', {
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
  like.associate = function (models) {
    like.belongsTo(models.user, { as: "user", foreignKey: "userId" })
    like.belongsTo(models.post, { as: "post", foreignKey: "postId" })
  };
  return like;
};