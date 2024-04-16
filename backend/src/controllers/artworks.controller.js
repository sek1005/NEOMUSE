const artworkModel = require("../models/artworks.model");

const insert = async (req, res, next) => {
  try {
    const artwork = req.body;
    artwork.thumbnail = `${req.protocol}://${req.get("host")}/upload/${
      req.files[0].filename
    }`;
    await artworkModel.insert(artwork);
    res.status(201).json(artwork);
  } catch (error) {
    console.error(error);
    res.status(500).json();
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const artwork = req.body;
    const [result] = await artworkModel.insert(artwork);
    if (result.insertId) {
      const [[newartwork]] = await artworkModel.findById(result.insertId);
      res.status(201).json(newartwork);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

const getALL = async (req, res, next) => {
  try {
    const [artwork] = await artworkModel.findAll();
    res.status(200).json(artwork);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[artwork]] = await artworkModel.findById(id);
    const [ArtworkTecniqueList] = await artworkModel.findByArtworkTechniqueList(
      artwork.artwork_technique_id
    );
    const fiterArtworkTecniqueList = ArtworkTecniqueList.filter(
      (oeuvreUnique) => artwork.artworks_id !== oeuvreUnique.artworks_id
    );
    if (artwork)
      res.status(200).json({
        artworkUnique: artwork,
        artworkList: fiterArtworkTecniqueList,
      });
    else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};
const getTechAll = async (req, res, next) => {
  try {
    const [technique] = await artworkModel.TechAll();
    res.status(200).json(technique);
  } catch (error) {
    next(error);
  }
};
const getBytech = async (req, res, next) => {
  try {
    const [Bytech] = await artworkModel.findBytech();
    res.status(200).json(Bytech);
  } catch (error) {
    next(error);
  }
};
const findAllByArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [artwork] = await artworkModel.findAllByArtist(id);
    res.status(200).json(artwork);
  } catch (error) {
    next(error);
  }
};
const deleteart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await artworkModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};
const updateArtwork = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await artworkModel.Update(req.body, id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insert,
  create,
  getALL,
  getById,
  getTechAll,
  getBytech,
  findAllByArtist,
  deleteart,
  updateArtwork,
};
