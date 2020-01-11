'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        validate:{
          isAlpha: true,
          notNull: true,
        }
      },
      title: {
        type: Sequelize.STRING(15),
        validate:{
          isAlpha: true,
          notNull: true,
          contains: '标题',
        }
      },
      time: {
        type: Sequelize.DATE,
        validate:{
            notNull: true,
        }
      },
      content: {
        type: Sequelize.STRING(150),
        validate:{
            notNull: true,
        }
      },
      status: {
        type: Sequelize.STRING(3),
        validate:{
            isAlpha: true,
            notNull: true,
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos');
  }
};