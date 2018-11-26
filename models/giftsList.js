module.exports = function(sequelize, DataTypes) {

     // defines gift list values within table

     var giftsList = sequelize.define("giftsList", {
          giftName: DataTypes.STRING,
          giftBudget: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,
     }, {
               freezeTableName: true,
               tableName: 'giftsList'
          });

     return giftsList;

}