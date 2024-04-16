const favorisModel = require("../models/favoris.model");

const createFavorite = async (req, res, next) => {
  try {
    const favoris = req.body;
    const [result] = await favorisModel.insertFavorite(favoris);
    if (result.affectedRows > 0) {
      const [[newfavoris]] = await favorisModel.findFavoriteByUsers(
        favoris.userID
      );
      res.status(201).json(newfavoris);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};
const getFavorites = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const [favoris] = await favorisModel.findFavoriteByUsers(userID);
    if (favoris) {
      res.status(200).json(favoris);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};
const deleteFavorite = async (req, res, next) => {
  try {
    const [result] = await favorisModel.deleteFavoriteById(req.body);
    if (result.affectedRows > 0) {
      res.sendStatus(200);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFavorite,
  getFavorites,
  deleteFavorite,
};
