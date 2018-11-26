module.exports = (app) => {
    // require('./apiRoutes')(app)
    require('./htmlRoutes')(app)
    require('./giftRoutes')(app)
    require('./wishRoutes')(app)
    require('./cardRoutes')(app)
    require('./eventRoutes')(app)
    require('./groceryRoutes')(app)
    require('./recipeRoutes')(app)
  }
  