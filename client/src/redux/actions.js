import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_NAME = "GET_VIDEOGAME_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL"
export const FILTER_BY_ABC = "FILTER_BY_ABC"
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE"
export const FILTER_BY_RATING = "FILTER_BY_RATING"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
export const CLEAR_DETAIL = "CLEAR_DETAIL"

export const getVideogames = () => {
    return async function(dispatch) {
        let videogames = await axios.get("http://localhost:3001/videogames");
        return dispatch({ type: GET_VIDEOGAMES, payload: videogames.data})
    }
}

export const getVideogamesDetail = (id) => {
    return async function(dispatch) {
        let videogameDetail = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({type: GET_VIDEOGAME_DETAIL, payload: videogameDetail.data})
    }
}

export const getVideogameByName = (name) => {
    return async function(dispatch) {
        const videogames = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        console.log(videogames)
        return dispatch({type: GET_VIDEOGAME_NAME, payload: videogames.data})
    }
}

export const createVideogame = (payload) => {
    return async function() {
        let createVideogame = await axios.post('http://localhost:3001/videogames')
        return createVideogame;
    }
}

export const getGenres = () => {
    return async function(dispatch) {
        const genres = await axios.get("http://localhost:3001/genres")
        return dispatch({type: GET_GENRES, payload: genres})
    }
}

export const filterByAbc = (payload) => {
    return { type: FILTER_BY_ABC, payload };
};

export const filterByGenre = (payload) => {
    return { type: FILTER_BY_GENRE, payload};
}

export const filterBySource = (payload) => {
    return {type: FILTER_BY_SOURCE, payload}
}

export const filterByRating = (payload) => {
    return {type: FILTER_BY_RATING, payload}
}

export const clearDetail = () => {
    return { type: CLEAR_DETAIL };
  };