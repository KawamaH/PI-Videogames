const { getAllVideogamesApi, getVideogameById, getVideogameByName } = require("../controllers/videogamesController.js")

const getAllVideogamesHandler = async (req,res) => {
    const {name} = req.query;
    try {
        const response = name ? await getVideogameByName(name) : await getAllVideogamesApi();
        res.status(200).send(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getVideogameByIdHandler = async (req,res) => {
    const {id} = req.params;
    try {
        const videogame = await getVideogameById(id)
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
}