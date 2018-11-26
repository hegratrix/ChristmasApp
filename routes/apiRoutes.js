//this file offers a set of routes for displaying and saving data to the db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

//Routes
// =============================================================
module.exports = function (app) {

     //Card Routes  
     //GET route for getting all of the cards data
     app.get("/cardsList/", function (req, res) {
          db.cardsList.findAll({})
               .then(function (dbCard) {
                    res.json(dbCard);
               });
     });

     // POST route for saving a new card 
     app.post("/cardsList", function (req, res) {
          console.log(req.body);
          db.cardsList.create({
               complete: req.body.isSent,
               cardName: req.body.cardName,
               cardAddress: req.body.cardAddress               
          })
               .then(function (dbCard) {
                    res.json(dbCard);
               });
     });

     // DELETE route for deleting cards
     app.delete("/cardsList/:id", function (req, res) {
          db.cardsList.destroy({where: {id: req.params.id}})
               .then(function (dbCard) {
                    res.json(dbCard);
               });
     });

     // PUT route for updating cards

     app.put("/cardsList", function (req, res) {          
          db.cardsList.update({
               cardName: req.body.cardName,
               cardAddress: req.body.cardAddress,
               complete: req.body.complete
          }, {
                    where: {
                         id: req.body.id
                    }
               }).then(function (dbCard) {
                    res.json(dbCard);
               });
     });

     //Event Routes 
     // GET route for getting all of the events data
     app.get("/eventList", function (req, res) {
          db.eventList.findAll({})
               .then(function (dbEvent) {
                    res.json(dbEvent);
               });
     });

     // POST route for saving a new event 
     app.post("/eventList", function (req, res) {
          db.eventList.create({
               eventName: req.body.eventName,
               eventDate: req.body.eventDate,
               eventTime: req.body.eventTime,
               eventLocation: req.body.eventLocation,
               complete: req.body.complete,    
               
          })
               .then(function (dbEvent) {
                    res.json(dbEvent);
               });
     });

     // DELETE route for deleting events
     app.delete("/eventList/:id", function (req, res) {
          db.eventList.destroy({where: {id: req.params.id}})
               .then(function (dbEvent) {
                    res.json(dbEvent);
               });
     });

     // PUT route for updating events
     app.put("/eventList", function (req, res) {         
          db.eventList.update({
               eventName: req.body.eventName,
               eventDate: req.body.eventDate,
               eventTime: req.body.eventTime,
               eventLocation: req.body.eventLocation,
               complete: req.body.complete
          }, {
                    where: {
                         id: req.body.id
                    }
               }).then(function (dbEvent) {
                    res.json(dbEvent);
               });
     });

     //Gift Routes

     // GET route for getting all of the gifts data
     app.get("/giftsList/", function (req, res) {
          db.giftsList.findAll({})
               .then(function (dbGift) {
                    res.json(dbGift);
               });
     });

     // POST route for saving a new gift 
     app.post("/giftsList", function (req, res) {
          db.giftsList.create({
               isPurchased: req.body.isPurchased,
               giftName: req.body.giftName,
               giftBudget: req.body.giftBudget
          })
               .then(function (dbGift) {
                    res.json(dbGift);
               });
     });

     // DELETE route for deleting gifts
     app.delete("/giftsList/:id", function (req, res) {
          db.giftsList.destroy({where: {id: req.params.id}})
               .then(function (dbGift) {
                    res.json(dbGift);
               });
     });

     // PUT route for updating gifts
     app.put("/giftsList", function (req, res) {          
          db.giftsList.update({
               giftName: req.body.giftName,
               giftBudget: req.body.giftBudget,
               complete: req.body.complete
          }, {
                    where: {
                         id: req.body.id
                    }
               }).then(function (dbGift) {
                    res.json(dbGift);
               });
     });

     //Recipe Routes 
     // GET route for getting all of the recipes data
     app.get("/recipeList/", function (req, res) {
          db.recipeList.findAll({})
               .then(function (dbRecipe) {
                    res.json(dbRecipe);
               });
     });

     // POST route for saving a new recipes 
     app.post("/recipeList", function (req, res) {
          console.log(req.body);
          db.recipeList.create({
               recipeName: req.body.recipeName,
               recipeLink: req.body.recipeLink,
               recipeMakes: req.body.recipeMakes,
               isMade: req.body.isMade               
          })
               .then(function (dbRecipe) {
                    res.json(dbRecipe);
               });
     });

     // DELETE route for deleting recipes
     app.delete("/recipeList/:id", function (req, res) {
          db.recipeList.destroy({where: {id: req.params.id}})
               .then(function (dbRecipe) {
                    res.json(dbRecipe);
               });
     });

     // PUT route for updating recipes
     app.put("/recipeList/:id", function (req, res) {
          db.recipeList.update(req.body, {where: {id: req.body.id}})
               .then(function (dbRecipe) {
                    res.json(dbRecipe);
               });
     });

     //Grocery Routes
     // GET route for getting all of the groceries data
     app.get("/groceryList", function (req, res) {
          db.groceryList.findAll({})
               .then(function (dbGroceries) {
                    res.json(dbGroceries);
               });
     });

     // POST route for saving a new groceries 
     app.post("/groceryList", function (req, res) {
          console.log(req.body);
          db.groceryList.create({
               groceryName: req.body.groceryName,
               groceryQuantity: req.body.groceryQuantity,
               isBought: req.body.isBought
          })
               .then(function (dbGroceries) {
                    res.json(dbGroceries);
               });
     });

     // DELETE route for deleting groceries
     app.delete("/groceryList/:id", function (req, res) {
          db.groceryList.destroy({where: {id: req.params.id}})
               .then(function (dGroceries) {
                    res.json(dbGroceries);
               });
     });

     // PUT route for updating groceries
     app.put("/groceryList/:id", function (req, res) {
          db.groceryList.update(req.body, {where: {id: req.body.id}})
               .then(function (dbGroceries) {
                    res.json(dbGroceries);
               });
     });


     //Wish Routes
     // GET route for getting all of the wishes data
     app.get("/wishList/", function (req, res) {
          db.wishList.findAll({})
               .then(function (dbWish) {
                    res.json(dbWish);                    
               });
     });

     // POST route for saving a new wishes 
     app.post("/wishList", function (req, res) {
          db.wishList.create({
               itemName: req.body.itemName,
               itemLocation: req.body.itemLocation,
               itemPrice: req.body.itemPrice,
               itemOptions: req.body.itemOptions,
               isPurchased: req.body.isPurchased
          })
               .then(function (dbWish) {                    
                    res.json(dbWish);
               });
     });

     // DELETE route for deleting wishes
     app.delete("/wishList/:id", function (req, res) {
          db.wishList.destroy({where: {id: req.params.id}})
               .then(function (dbWish) {
                    res.json(dbWish);
               });               
     });

     // PUT route for updating wishes
     app.put("/wishList/:id", function (req, res) {
          db.wishList.update(req.body, {where: {id: req.body.id}})
               .then(function (dbWish) {
                    res.json(dbWish);
               });
     });
};