const db = require("../../database/client");

const findAll = () => {
  return db.query("SELECT * FROM events ");
};

module.exports = {
  findAll,
};
