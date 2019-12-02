const housesRouter = require("express").Router();
const { getHouses } = require("../controllers/houses-controllers");

housesRouter.route("/").get(getHouses);

module.exports = housesRouter;
