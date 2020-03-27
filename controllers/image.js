const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "68f06ca386f44b088f63e45781c19b89"
});
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Unable to work with API"));
};

const getImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json("Unable to get entries"));
};
module.exports = {
  getImage: getImage,
  handleApiCall: handleApiCall
};
