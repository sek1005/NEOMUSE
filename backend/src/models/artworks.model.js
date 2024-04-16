const db = require("../../database/client");

const insert = (artwork) => {
  const { title, description, price, thumbnail } = artwork;

  return db.query(
    "INSERT INTO artworks (title, description, art_theme, price, dimension_height, dimension_width, dimension_depth, price_on_demand, thumbnail, artists_id, artwork_technique_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      artwork.art_theme,
      price,
      artwork.dimension_height,
      artwork.dimension_width,
      artwork.dimension_depth,
      artwork.price_on_demand,
      thumbnail,
      artwork.artists_id,
      artwork.artwork_technique_id,
    ]
  );
};

const findAll = () => {
  return db.query("SELECT * FROM artworks ");
};
const findAllByArtist = (id) => {
  return db.query(
    "SELECT artworks.* FROM artworks JOIN artists ON artworks.artists_id = artists.artist_id WHERE artworks.artists_id = ?",
    [id]
  );
};

const findByArtworkTechniqueList = (id) => {
  return db.query("select * from artworks where `artwork_technique_id` = ?", [
    id,
  ]);
};
const findById = (id) => {
  return db.query(
    "SELECT a.artworks_id, a.title, a.description, a.price, a.art_theme, a.dimension_height, a.dimension_height, a.dimension_width, a.price_on_demand, a.thumbnail, a.artists_id, a.artwork_technique_id, t.name as technique_name, art.firstname, art.lastname FROM artworks as a JOIN artwork_technique as t ON t.artwork_technique_id=a.artwork_technique_id JOIN artists as art ON art.artist_id=a.artists_id WHERE artworks_id  = ?",
    [id]
  );
};

const TechAll = () => {
  return db.query("SELECT * FROM artwork_technique ");
};
const findBytech = () => {
  return db.query(
    "SELECT a.artworks_id, a.title, a.price, a.art_theme, a.dimension_height, a.dimension_height, a.dimension_width, a.price_on_demand, a.thumbnail, t.name as technique_name FROM artworks as a JOIN artwork_technique as t ON t.artwork_technique_id=a.artwork_technique_id"
  );
};
const deleteById = (id) => {
  return db.query("DELETE FROM artworks WHERE artworks_id = ? ", [id]);
};
const Update = (artwork, id) => {
  const { title, description, price } = artwork;
  return db.query(
    "UPDATE artworks SET title = ?, description = ?, art_theme = ?, price = ?, dimension_height = ?, dimension_width = ?, dimension_depth = ? WHERE artworks_id = ?",
    [
      title,
      description,
      artwork.art_theme,
      price,
      artwork.dimension_height,
      artwork.dimension_width,
      artwork.dimension_depth,
      id,
    ]
  );
};

module.exports = {
  insert,
  findAll,
  deleteById,
  findById,
  TechAll,
  findBytech,
  findByArtworkTechniqueList,
  findAllByArtist,
  Update,
};
