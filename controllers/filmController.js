const mongoose = require("mongoose");
const { Film: FilmModel, Film } = require("../models/Film");

let ids = 0;

const filmController = {
  create: async (req, res) => {
    try {
      const { user } = req;

      console.log(user);

      const film = {
        userId: user._id,
        title: req.body.title,
        genre: req.body.genre,
        ageRange: req.body.ageRange,
        year: req.body.year,
        director: req.body.director,
      };

      if (film) {
        const filmCreated = await FilmModel.create(film);

        if (!filmCreated) {
          res.status(422).json({ msg: "Filme não criado." });
          return;
        }

        user.films.push(filmCreated);
        await user.save();

        return res
          .status(201)
          .json({ filmCreated, msg: "Filme criado com sucesso!" });
      } else {
        res.status(400).json({ message: "Falha na inserção do filme" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const pageOptions = {
          pagina: parseInt(req.query.pagina),
          limite: parseInt(req.query.limite) 
      }

      await FilmModel.find()
      .limit(pageOptions.limite)
      .skip(pageOptions.limite * pageOptions.pagina)
      .then((results) => {
          return res.status(200).send(results);
      })
      .catch((err) => {
          return res.status(500).send(err);
      });
    
  } catch (error) {
    console.log(error);
    res.json({msg: "Por favor insira no final da URL um limite de elementos para renderização e qual pagina deseja acessar: /?limite=10/?pagina=1"})
  }
  },
  get: async (req, res) => {
    try {
      const { user } = req;
      const id = req.params.id;

      const film = await FilmModel.findOne({
        _id: id,
        userId: user._id,
      });

      if (!film) {
        res
          .status(404)
          .json({ msg: "Filme não encontrado, informe um ID válido." });
        return;
      }

      res.json(film);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).json({
          message:
            "ID Inválido: Por favor consulte o ID do filme que deseja atulizar na listagem de filmes, lembrando que o o ID do mongo é unico e se trata de uma string e não um número.",
        });
      }
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const film = {
        title: req.body.title,
        genre: req.body.genre,
        ageRange: req.body.ageRange,
        year: req.body.year,
        director: req.body.director,
      };

      const updatedFilm = await FilmModel.findByIdAndUpdate(id, film);

      if (!updatedFilm) {
        res
          .status(404)
          .json({ msg: "Filme não encontrado, informe um ID válido." });
        return;
      }

      res.status(200).json({ film, msg: "Filme alterado com sucesso!" });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).json({
          message:
            "ID Inválido: Por favor consulte o ID do filme que deseja atulizar na listagem de filmes, lembrando que o o ID do mongo é unico e se trata de uma string e não um número.",
        });
      }
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const film = await FilmModel.findById(id);

      if (!film) {
        res.status(404).json({ msg: "Informe um id válido." });
        return;
      }

      const deletedFilm = await FilmModel.findByIdAndDelete(id);

      res.status(200).json({ deletedFilm, msg: "Filme excluído com sucesso!" });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).json({
          message:
            "ID Inválido: Por favor consulte o ID do filme que deseja atulizar na listagem de filmes, lembrando que o o ID do mongo é unico e se trata de uma string e não um número.",
        });
      }
      console.log(error);
    }
  },
};

module.exports = filmController;
