const { getAllVideogamesApi } = require('./videogamesController')
const getAllPlatforms = async() => {
    const videogamesArray = await getAllVideogamesApi();
    let platforms = [];
  
    for (let i = 0; i < videogamesArray.length; i++) {
        const videogame = videogamesArray[i];
        for(let j= 0; j< videogame.platforms.length;j++){
            const platform = videogame.platforms[j];
            if(!platforms.includes(platform)){
                platforms.push(platform)
            }
        }
    }
    console.log(platforms)
    return platforms;
  }

  module.exports ={
    getAllPlatforms
  }