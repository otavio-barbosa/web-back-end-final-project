const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User')
const userInstall = require('../install/user');
const filmInstall = require('../install/films');
const genreInstall = require('../install/genre');
const ageRangeInstall = require('../install/ageRange');
const { Genre } = require("../models/Genre");
const { AgeRange } = require("../models/AgeRange");
const { Film } = require("../models/Film");
const { UserModel } = require("../models/User");

router.get("/install", async (req, res) => {
  try {
    const userData = userInstall;
    const genreData = genreInstall;
    const ageRangeData = ageRangeInstall;

    const genresInstalled = await Genre.insertMany(genreData);
    const ageRangesInstalled = await AgeRange.insertMany(ageRangeData);
    const users = await UserModel.insertMany(userData);

    for (const film of filmInstall) {
      const {
        ageRange: ageRangeFilm,
        genre: genreFilms,
        ...filmWithoutRangeFilm
      } =  film

      const ageRanges = [];

      for (const ageRange of ageRangeFilm) {
        const ageRangeObj = await AgeRange.findOne({
          country: ageRange.country,
          age: ageRange.age,
        });

        ageRanges.push(ageRangeObj._id);
      }

      const genres = [];

      for (const genre of genreFilms) {
        const genreObj = await Genre.findOne({ title: genre });

        genres.push(genreObj._id);
      }

      const filmObj = {
        ...filmWithoutRangeFilm,
        ageRange: ageRanges,
        genre: genres,
      };

      const randomUserId = users[Math.floor(Math.random() * users.length)]._id;

      await Film.create({
        ...filmObj,
        userId: randomUserId,
      });
    }

    res.json({ success: true, message: 'Instalação concluída com sucesso!', users });
  } catch (error) {
    console.error('Erro durante a instalação:', error);
    res.status(500).json({ success: false, message: 'Erro durante a instalação' });
  } 
})

module.exports = router;