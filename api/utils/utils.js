const cleanArray = async (videogamesRaw) => {
  const cleanedArray = await videogamesRaw.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      released: elem.released,
      image: elem.background_image,
      platforms: elem.platforms? elem.platforms.map((res) => res.platform.name + ""): 'null',
      genres: elem.genres.map((res) => res.name + ""),
      rating: elem.rating,
    };
  });
  return cleanedArray;
};

const cleanArrayDetail = async (videogame) => {
  const cleanedArray = await videogame.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      released: elem.released,
      image: elem.background_image,
      platforms: elem.platforms.map((res) => res.platform.name + ""),
      genres: elem.genres.map((res) => res.name + ""),
      rating: elem.rating,
      description: elem.description,
    };
  });
  return cleanedArray;
};

module.exports = { cleanArray, cleanArrayDetail };
