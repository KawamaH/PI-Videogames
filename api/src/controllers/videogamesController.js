require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { cleanArray, cleanArrayDetail } = require("../../utils/utils.js");
const { Videogame, Genre } = require("../db.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const getAllGenres = require("./genresController.js");

const getAllVideogamesApi = async () => {
  let videogamesArray = []

  let url = (`https://api.rawg.io/api/games?key=${API_KEY}`)

  for(var i=1;i<6;i++){
    let videogamesApi = await axios.get(url)
    url = (videogamesApi.data.next)
    let data = (videogamesApi.data.results)
    let cleanData = await cleanArray(data)
    videogamesArray.push(cleanData)
  }

  const videogames = videogamesArray.flat();
  return videogames;

};

const getAllVideogamesDb = async () => {
  const videogamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return videogamesDb;
};

const getAllVideogames = async () => {
  const videogamesApi = await getAllVideogamesApi();
  const videogamesDb = await getAllVideogamesDb();
  videogamesApi.push(...videogamesDb);
  return videogamesApi;
};

const getVideogameById = async (id, source) => {
  if (source === "api") {
    const videogame = await getVideogameByIdApi(id);
    return videogame;
  } else {
    const videogame = await getVideogameByIdBd(id);
    return videogame;
  }
};

const getVideogameByIdBd = async (id) => {
  const videogame = await Videogame.findByPk(id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return videogame;
};

const getVideogameByIdApi = async (id) => {
  const videogameFinded = await cleanArrayDetail([
    (
      await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    ).data,
  ]);

  return videogameFinded;
};

const getVideogameByName = async (name) => {
  let videogameDb = await getVideogameByNameBd(name);
  let videogameApi = await getVideogameByNameApi(name);
  if (!videogameApi.length && !videogameDb.length)
    throw new Error("The videogame doesn't exist");
  const results = [...videogameDb, ...videogameApi];
  return results;
};

const getVideogameByNameBd = async (name) => {
  const dbResults = await Videogame.findAll({
    where: { name: { [Op.iLike]: name } },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbResults;
};

const getVideogameByNameApi = async (name) => {
  const apiResults = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    )
  ).data.results;
  const apiResultsCleaned = await cleanArray(apiResults);
  return apiResultsCleaned;
};

const createVideogame = async (
  name,
  description,
  platforms,
  img,
  released,
  rating,
  genre
) => {
  const videogamesDb = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (videogamesDb.length) return "There is already a game with that name.";

  const newVideogame = await Videogame.create({
    name: name,
    description: description,
    platforms: platforms,
    img: img,
    released: released,
    rating: rating,
    createInDb: true,
  });

  const genresDb = await Genre.count();
  if (genresDb === 0) {
    await getAllGenres();
  }

  const genresFounded = await Promise.all(
    genre.map(async (gen) => {
      const genreFounded = await Genre.findOne({ where: { name: gen } });
      if (!genreFounded) {
        throw new Error(`The genre ${gen} doesn't exist`);
      }
      return genreFounded;
    })
  );
  
  await newVideogame.addGenre(genresFounded);
  return newVideogame;
};

module.exports = {
  getAllVideogamesApi,
  getVideogameById,
  getVideogameByName,
  createVideogame,
  getAllVideogames,
};
