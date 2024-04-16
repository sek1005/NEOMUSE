const db = require("../../database/client");

const AllFavorites = () => {
  return db.query("SELECT * FROM set_favorite ");
};
const insertFavorite = (favori) => {
  console.info(favori);

  return db.query(
    "INSERT INTO set_favorite ( users_id, artworks_id ) VALUES (?, ?)",
    [favori.userID, favori.artworks_id]
  );
};
const findFavoriteByUsers = (usersid) => {
  return db.query(
    "SELECT * FROM set_favorite AS f JOIN artworks AS a ON f.artworks_id = a.artworks_id  WHERE users_id = ?",
    [usersid]
  );
};
const deleteFavoriteById = (favorite) => {
  return db.query(
    "DELETE FROM set_favorite WHERE artworks_id = ? AND users_id = ?",
    [favorite.artworks_id, favorite.userID]
  );
};

module.exports = {
  findFavoriteByUsers,
  insertFavorite,
  AllFavorites,
  deleteFavoriteById,
};
