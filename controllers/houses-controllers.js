const {
  selectHouses,
  insertHouse,
  selectHouseById,
  deleteHouseById,
  selectStudentsByHouseId
} = require("../models/houses-models.js");

exports.getHouses = (req, res, next) => {
  selectHouses().then(houses => {
    res.status(200).send({ houses });
  });
};

exports.postHouse = (req, res, next) => {
  const newHouse = req.body;
  insertHouse(newHouse).then(house => {
    res.status(201).send({ house });
  });
};

exports.getHouseById = (req, res, next) => {
  const { house_id } = req.params;
  selectHouseById(house_id).then(house => {
    res.status(200).send({ house });
  });
};

exports.removeHouseById = (req, res, next) => {
  const { house_id } = req.params;
  deleteHouseById(house_id).then(() => {
    res.status(204).send({});
  });
};

exports.getStudentsByHouseId = (req, res, next) => {
  const { house_id } = req.params;
  selectStudentsByHouseId(house_id).then(students => {
    res.status(200).send({ students });
  });
};
