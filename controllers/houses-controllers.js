const { selectHouses } = require("../models/houses-models.js");

exports.getHouses = (req, res, next) => {
  selectHouses().then(houses => {
    res.status(200).send({ houses });
  });
};
