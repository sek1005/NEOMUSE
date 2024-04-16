const artworkModel = require("../models/events.model");

const getAll = async (req, res, next) => {
  try {
    const [event] = await artworkModel.findAll();
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
