const client = require("../db/client");

exports.selectHouses = () => {
  return client.query("SELECT * FROM houses;").then(result => {
    return result.rows;
  });
};

exports.insertHouse = ({ house_name, founder, animal }) => {
  return client
    .query(
      "INSERT INTO houses (house_name, founder, animal) VALUES ($1, $2, $3) RETURNING *;",
      [house_name, founder, animal]
    )
    .then(result => {
      return result.rows[0];
    })
};

exports.selectHouseById = house_id => {
  return client
    .query("SELECT * FROM houses WHERE house_id = $1;", [house_id])
    .then(result => {
      return result.rows[0];
    });
};

exports.deleteHouseById = house_id => {
  return client.query("DELETE FROM houses WHERE house_id = $1;", [house_id]);
};

exports.selectStudentsByHouseId = house_id => {
  return client
    .query("SELECT * FROM students WHERE students.house_id = $1", [house_id])
    .then(result => {
      return result.rows;
    });
};
