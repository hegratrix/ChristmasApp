module.exports = function (sequelize, DataTypes) {
     
     // defines recipe list values within table

     var recipeList = sequelize.define("recipeList", {
          recipeName: DataTypes.STRING,
          recipeLink: DataTypes.STRING,
          recipeMakes: DataTypes.STRING,
          isMade: DataTypes.BOOLEAN,
          
     }, {
          freezeTableName: true,
          tableName: 'recipeList'
          });

    return recipeList;
};