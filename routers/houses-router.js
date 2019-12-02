const housesRouter = require("express").Router();
const {
  getHouses,
  postHouse,
  getHouseById,
  removeHouseById,
  getStudentsByHouseId
} = require("../controllers/houses-controllers");

housesRouter
  .route("/")
  .get(getHouses)
  .post(postHouse);

housesRouter
  .route("/:house_id")
  .get(getHouseById)
  .delete(removeHouseById);

housesRouter.route("/:house_id/students").get(getStudentsByHouseId);
module.exports = housesRouter;
