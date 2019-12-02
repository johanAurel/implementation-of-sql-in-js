const client = require("../db/client");

exports.selectHouses = () => {
  return client.query("SELECT * FROM houses;").then(result => {
    return result.rows;
  });
};
