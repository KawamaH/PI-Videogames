import {
  CLEAR_DETAIL,
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  GET_VIDEOGAME_NAME,
  GET_GENRES,
  FILTER_BY_SOURCE,
  FILTER_BY_GENRE,
  FILTER_BY_ABC,
  FILTER_BY_RATING,
} from "./actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GET_VIDEOGAME_NAME:
      return { ...state, videogames: action.payload };
    case GET_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: action.payload };
    case CLEAR_DETAIL:
      return { ...state, videogameDetail: {} };
    case FILTER_BY_SOURCE:
      const allVideogames = state.allVideogames;
      const filter =
        action.payload === "created"
          ? allVideogames.filter((v) => v.createInDb)
          : allVideogames.filter((v) => !v.createInDb);
      return {
        ...state,
        videogames: action.payload === "all" ? state.allVideogames : filter,
      };
    case FILTER_BY_GENRE:
      const allVideogamesG = state.allVideogames;
      const filteredGenres =
        action.payload === "all"
          ? state.allVideogames
          : allVideogamesG.filter((g) => {
              return g.genres.includes(action.payload);
            });
      console.log(allVideogamesG);
      return { ...state, videogames: filteredGenres };

    case FILTER_BY_ABC:

      let filteredGames = [...state.allVideogames]; 
      if (action.payload === "asc") {
       
        filteredGames.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (action.payload === "des") {
        
        filteredGames.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
       
      return { ...state, videogames: filteredGames };

    case FILTER_BY_RATING:
      let filteredGamesR = [...state.allVideogames.filter((r)=>r.rating)]

      if(action.payload === 'min'){
        filteredGamesR.sort((a,b) => {
          return a.rating - b.rating
        })
      } else if (action.payload === 'max'){
        filteredGamesR.sort((a,b) => {
          return a.rating - b.rating;
        }).reverse();
      }
      return {...state, videogames: filteredGamesR}

    default:
      return { ...state };
  }
};

export default rootReducer;
