const { getAllPlatforms } = require('../controllers/platformsController')
const getAllPlatformsHandler = async (req,res) => {
    console.log('waos')
    try {
        const response = await getAllPlatforms();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getAllPlatformsHandler}