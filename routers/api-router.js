const apiRouter = require("express").Router();
const housesRouter = require("./houses-router");

apiRouter.use("/houses", housesRouter);

module.exports = apiRouter;
