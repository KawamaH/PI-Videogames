const {Genre} = require('../db')
const axios = require('axios')
require("dotenv").config();
const { API_KEY } = process.env;

const getAllGenres = async() => {
    let genresDb = await Genre.findAll();
    if(genresDb.length === 0) {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let genresArray = genresApi.data.results.map (elem => elem.name)
        genresArray = genresArray.join().split(',')
        genresArray = genresArray.map(elem => elem.trim())
        genresArray.forEach(async(elem) => {
            if(elem.length > 0) {
                await Genre.findOrCreate({
                    where: {name:elem}
                })
            }
        });
        genresDb = await Genre.findAll();
    }
    return genresDb;
}

module.exports = getAllGenres;