const { Genre: GenreModel } = require("../models/Genre");

const genreController = {
  create: async (req, res) => {
    try {
      const genre = {
        title: req.body.title,
        description: req.body.description
      };

      const response = await GenreModel.create(genre);

      res.status(201).json({ response, msg: "Gênero criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const genres = await GenreModel.find();
      res.json(genres);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const genre = await GenreModel.findById(id);

      if (!genre) {
        res.status(404).json({ msg: "Gênero não encontrado." });
        return;
      }

      res.json(genre);
    } catch (error) {
      console.log(error);
    }
  },
  getByName: async (name) => {
    try {
      const genre = await GenreModel.findOne({ title: name });
      return genre;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const genre = await GenreModel.findById(id);

      if (!genre) {
        res.status(404).json({ msg: "Informe um id válido." });
        return;
      }

      const deletedGenre = await GenreModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedGenre, msg: "Gênero excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;

    const genre = {
      title: req.body.title,
      description: req.body.description
    };

    const updatedGenre = await GenreModel.findByIdAndUpdate(id, genre);

    if (!updatedGenre) {
      res.status(404).json({ genre: "Informe um id válido." });
      return;
    }

    res.status(200).json({ genre, msg: "Gênero Atualizado com sucesso!" });
  },
};

module.exports = genreController;
