require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { cleanArray, cleanArrayDetail } = require("../../utils/utils.js");
const { Videogame, Genre } = require("../db.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const getAllGenres = require("./genresController.js");

const getAllVideogamesApi = async () => {
  let videogamesArray = [];

  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

  for (var i = 1; i < 6; i++) {
    let videogamesApi = await axios.get(url);
    url = videogamesApi.data.next;
    let data = videogamesApi.data.results;
    let cleanData = await cleanArray(data);
    videogamesArray.push(cleanData);
  }

  // for (var i = 1; i < 6; i++) {
  //   let videogamesApi = await axios.get(`${url}&page=${i}`);
  //   let data = videogamesApi.data.results;
  //   let cleanData = await cleanArray(data);
  //   videogamesArray.push(cleanData);
  // }

  // const videogames = videogamesArray.flat();
  // return videogames;

  // const promise1 = axios.get(
  //   `https://api.rawg.io/api/games?key=${API_KEY}&page=1`
  // );
  // const promise2 = axios.get(
  //   `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  // );
  // const promise3 = axios.get(
  //   `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  // );
  // const promise4 = axios.get(
  //   `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  // );
  // const promise5 = axios.get(
  //   `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  // );

  const promises = [];
  for (let i = 1; i <= 5; i++) {
    promises.push(
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
    );
  }
  await Promise.all(promises).then(
    function (values) {
      apiResults = values[0].data.results
        .concat(values[1].data.results)
        .concat(values[2].data.results)
        .concat(values[3].data.results)
        .concat(values[4].data.results);
    },
    {
      function(err) {
        console.log(err);
      },
    }
  );
  cleanData = cleanArray(apiResults);
  return cleanData;
};

const getAllPlatforms = async () => {
  const videogamesArray = await getAllVideogamesApi();
  let platforms = [];

  videogamesArray.forEach((plat) => {
    if (!platforms.includes(plat)) {
      platforms.push(plat);
    }
  });
  console.log(platforms);
  return platforms;
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
  return [videogame];
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
  console.log(apiResults);
  const apiResultsCleaned = await cleanArray(apiResults);
  return apiResultsCleaned;
};

const createVideogame = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genre,
  price
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
    image: image,
    released: released,
    rating: rating,
    createInDb: true,
    price: price,
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
  getAllPlatforms,
};
