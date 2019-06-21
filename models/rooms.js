'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    room_name: DataTypes.STRING,
    creator_id: DataTypes.INTEGER
  }, {});
  rooms.associate = function(models) {
    // associations can be defined here
  };
  return rooms;
};