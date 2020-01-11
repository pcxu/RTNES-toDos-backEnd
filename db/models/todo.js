'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    time: DataTypes.DATE,
    content: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    timestamps: false
  });
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};