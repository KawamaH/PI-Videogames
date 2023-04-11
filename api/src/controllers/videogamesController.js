require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { cleanArray, cleanArrayDetail } = require("../../utils/utils.js");

const getAllVideogamesApi = async () => {
  const videogamesApi = await cleanArray(
    (
      await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    ).data.results
  );
  return videogamesApi;
};

const getVideogameById = async (id) => {
  const videogameFinded = await cleanArrayDetail([
    (
      await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    ).data,
  ]);
  return videogameFinded;
};

const getVideogameByName = async (name) => {
    const apiResults = await axios.get(`https://api.rawg.io/api/games?key=00c261aa74f34b8ca80a1ca1982d1d9f&search=mine`).data
    console.log(apiResults)
    return apiResults;
};
module.exports = { getAllVideogamesApi, getVideogameById, getVideogameByName };
