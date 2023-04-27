const {getVideogameById, getVideogameByName,createVideogame, getAllVideogames } = require("../controllers/videogamesController.js")

const getAllVideogamesHandler = async (req,res) => {
    const {name} = req.query;
    try {
        const response = name ? await getVideogameByName(name) : await getAllVideogames();
        res.status(200).send(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createVideogameHandler = async (req,res) => {
    const { name, description,platforms, image, released, rating, genres } = req.body
    try {
        if(!name || !description || !platforms || !image || !released || !rating || !genres){
        throw Error ('Videogame information is missing')
        } else {
            const newVideogame = await createVideogame(name,description,platforms,image,released,rating, genres)
            res.status(200).json(newVideogame)
        }
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

const getVideogameByIdHandler = async (req,res) => {
    const {id} = req.params;
    const source = isNaN(id) ? 'db' : 'api'
    try {
        const videogame = await getVideogameById(id,source)
        if (!videogame) throw new Error("Videogame not founded")
        res.status(200).json(videogame)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllVideogamesHandler,
    getVideogameByIdHandler,
    getVideogameByName,
    createVideogameHandler,
}