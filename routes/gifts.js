 // POST route for saving a new card 
 app.post("/cardsList", function (req, res) {
    console.log(req.body);
    db.cardsList.create({
         isSent: false,
         cardName: req.body.cardName,
         cardAddress: req.body.cardAddress               
    })
         .then(function (dbCard) {
              res.json(dbCard);
         });
});