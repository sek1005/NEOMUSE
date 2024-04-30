const db = require("../../database/client");

const findAll = () => {
  return db.query("SELECT * FROM users");
};
const insert = (user) => {
  const { firstname, lastname, email, password } = user;
  console.info(user);

  return db.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
    [firstname, lastname, email, password]
  );
};

const findById = (id) => {
  return db.query("SELECT * FROM users WHERE users_id = ?", [id]);
};
const findByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = ?", [email]);
};
const deleteById = (id) => {
  return db.query("DELETE FROM users WHERE users_id = ? ", [id]);
};
const Update = (id, data) => {
  return db.query("UPDATE users SET ? WHERE users_id= ?", [data, id]);
};

module.exports = {
  insert,
  findById,
  findAll,
  findByEmail,
  deleteById,
  Update,
};
