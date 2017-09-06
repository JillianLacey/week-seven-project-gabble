'use strict';
module.exports = function (sequelize, DataTypes) {
  var like = sequelize.define('like', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
    {});
  like.associate = function (models) {
    like.belongsTo(models.user, { as: "user", foreignKey: "userId" })
    like.belongsTo(models.post, { as: "post", foreignKey: "postId" })
  };
  return like;
};
