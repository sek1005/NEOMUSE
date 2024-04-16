const db = require("../../database/client");

const insert = (artist) => {
  const { firstname, lastname, thumbnail, biography } = artist;
  return db.query(
    "insert into artists(artist_name, firstname, lastname, thumbnail, biography) VALUES (?,?,?,?,?)",
    [artist.artist_name, firstname, lastname, thumbnail, biography]
  );
};
const findAll = () => {
  return db.query("SELECT * FROM artists ");
};
const findById = (id) => {
  return db.query("SELECT * FROM artists WHERE artist_id  = ?", [id]);
};

const findByName = (name) => {
  return db.query("SELECT * FROM artists WHERE artist_name LIKE ?", [
    `%${name}%`,
  ]);
};
const deleteById = (id) => {
  return db.query("DELETE FROM artists WHERE artist_id= ? ", [id]);
};
const Update = (artist, id) => {
  const { firstname, lastname, biography } = artist;
  return db.query(
    "UPDATE artists SET artist_name = ?, firstname = ?, lastname = ?, biography = ? WHERE artist_id = ?",
    [artist.artist_name, firstname, lastname, biography, id]
  );
};
module.exports = {
  insert,
  findAll,
  findById,
  findByName,
  deleteById,
  Update,
};
