module.exports = function(sequelize, DataTypes) {

     // defines card list values within table

     var cardsList = sequelize.define("cardsList", {
          cardName: DataTypes.STRING,
          cardAddress: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,
     }, {
               freezeTableName: true,
               tableName: 'cardsList'
          }
          );

     return cardsList;
}