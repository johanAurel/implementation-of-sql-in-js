const apiRouter = require('express').Router();
const teamsRouter = require('./teams-router');

apiRouter.use('/teams', teamsRouter);

module.exports = apiRouter;
