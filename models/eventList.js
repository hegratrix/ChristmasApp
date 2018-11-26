module.exports = function(sequelize, DataTypes) {

     var eventList = sequelize.define("eventList", {
          whichList: DataTypes.STRING,
          eventName: DataTypes.STRING,
          eventDate: DataTypes.STRING,
          eventTime: DataTypes.STRING,
          eventLocation: DataTypes.STRING,
          complete: DataTypes.BOOLEAN
          },
          {
               freezeTableName: true,
               tableName: 'eventList'
          }
     );
     return eventList;
}