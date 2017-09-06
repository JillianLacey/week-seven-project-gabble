'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn("posts", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    })

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn("posts", "userId");
  }
};
