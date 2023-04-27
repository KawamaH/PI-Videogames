import {
  CLEAR_DETAIL,
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  GET_VIDEOGAME_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_BY_SOURCE,
  FILTER_BY_GENRE,
  ORDER_BY,
} from "./actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  genres: [],
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GET_VIDEOGAME_NAME:
      return { ...state, videogames: action.payload };
    case GET_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: action.payload };
    case CLEAR_DETAIL:
      return { ...state, videogameDetail: {} };
    case ORDER_BY:
      let stateCopy = [...state.allVideogames];
      let order;
      switch (action.payload) {
        case "asc":
          order = stateCopy.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
          console.log(order);
          break;
        case "des":
          order = stateCopy.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          break;
        case "ratingAsc":
          order = stateCopy.sort((a, b) => {
            return a.rating - b.rating;
          });
          break;
        case "ratingDes":
          order = stateCopy.sort((a, b) => {
            return b.rating - a.rating;
          });
          break;
        default:
          order = stateCopy;
          break;
      }
      return {
        ...state,
        videogames: order,
        allVideogames: order,
      };
    case FILTER_BY_SOURCE:
      const allVideogames = [...state.allVideogames];
      const filter =
        action.payload === "created"
          ? allVideogames.filter((v) => v.createinDb)
          : allVideogames.filter((v) => !v.createinDb);
      return {
        ...state,
        videogames: action.payload === "all" ? allVideogames : filter,
      };
    case FILTER_BY_GENRE:
      const allVideogamesG = [...state.allVideogames];
      const filteredGenres =
        action.payload === "all"
          ? allVideogamesG
          : state.allVideogames.filter((g) => {
              return !g.createinDb
                ? g.genres.includes(action.payload)
                : g.Genres.map((gen) => gen.name).includes(action.payload);
            });

      return {
        ...state,
        videogames: filteredGenres,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
