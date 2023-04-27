import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getGenres, getPlatforms, getVideogames } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import validate from "./validate";
import style from "./Form.module.css";
import Loading from "../../components/Loading/Loading";

function Form() {
  const dispatch = useDispatch();
  const genresData = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const genres = genresData.data;
  const today = new Date().toISOString().split("T")[0];

  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    genres: [],
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    genres: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(getVideogames())
  }, [dispatch]);

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const selectGenreHandler = (e) => {
    e.preventDefault();
    if (!input.genres.includes(e.target.value)) {
      setInput({ ...input, genres: [...input.genres, e.target.value] });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const selectPlatfromHandler = (e) => {
    e.preventDefault();
    if (!input.platforms.includes(e.target.value)) {
      setInput({ ...input, platforms: [...input.platforms, e.target.value] });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function deleteHandlerGenre(elem) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== elem),
    });
  }

  function deleteHandlerPlatform(elem) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== elem),
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createVideogame(input));
    alert("Videogame has been created!");
    setInput({
      name: "",
      description: "",
      platforms: [],
      released: "",
      rating: "",
      genres: [],
      image: "",
    });
    history.push("/home");

  };

  if (!platforms) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        <Link to="/home">
          <button className={style.buttonHome}> HOME!</button>
        </Link>

        <br></br>

        <div className={style.container}>
          <div className={style.formContainer}>
            <h1 className={style.title}>Create your videogame</h1>
            <form onSubmit={(e) => submitHandler(e)}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) => changeHandler(e)}
                  name="name"
                  className={errors.name && "warning"}
                  placeholder="Choose a name"
                  autoComplete="off"
                ></input>
                {errors.name && <p className={style.errors}>{errors.name}</p>}
              </div>
              <br></br>
              <div>
                <label>Description:</label>
                <input
                  placeholder="Write a description"
                  type="text"
                  value={input.description}
                  onChange={(e) => changeHandler(e)}
                  className={errors.description && "warning"}
                  name="description"
                  autoComplete="off"
                ></input>
                {errors.description && (
                  <p className={style.errors}>{errors.description}</p>
                )}
              </div>
              <br></br>

              <div>
                <label>Released date:</label>\
                <input
                  type="date"
                  max={today}
                  value={input.released}
                  onChange={(e) => changeHandler(e)}
                  name="released"
                  autoComplete="off"
                ></input>
                {errors.released && (
                  <p className={style.errors}>{errors.released}</p>
                )}
              </div>
              <br></br>
              <div>
                <label>Rating: </label>
                <input
                  type="number"
                  step=".1"
                  min="0"
                  max="5"
                  value={input.rating}
                  onChange={(e) => changeHandler(e)}
                  className={errors.rating && "warning"}
                  name="rating"
                  autoComplete="off"
                ></input>
                {errors.rating && (
                  <p className={style.errors}>{errors.rating}</p>
                )}
              </div>
              <br></br>
              <div>
                <label>Platforms:</label>
                {platforms?.map((plat) => (
                  <button
                    className={style.button}
                    value={plat}
                    key={plat}
                    onClick={(e) => selectPlatfromHandler(e)}
                    name="platforms"
                  >
                    {plat}
                  </button>
                ))}
                {errors.platforms && (
                  <p className={style.errors}>{errors.platforms}</p>
                )}
              </div>
              <br></br>
              <div>
                <label>Genres:</label>
                {genres?.map((gen) => (
                  <button
                    className={style.button}
                    value={gen.name}
                    key={gen.name}
                    onClick={(e) => selectGenreHandler(e)}
                    name="genres"
                  >
                    {gen.name}
                  </button>
                ))}
                {errors.genres && (
                  <p className={style.errors}>{errors.genres}</p>
                )}
              </div>
              <br />
              <div>
                <label>Image:</label>
                <input
                  type="url"
                  value={input.image}
                  onChange={(e) => changeHandler(e)}
                  name="image"
                  placeholder="Add url"
                  autoComplete="off"
                ></input>
                {errors.image && <p className={style.errors}>{errors.image}</p>}
              </div>

              <br />
              <button
                className={style.buttonSubmit}
                type="submit"
                disabled={
                  !input.name ||
                  errors.name ||
                  errors.description ||
                  errors.image ||
                  !input.genres.length ||
                  !input.platforms.length
                }
              >
                SUBMIT
              </button>
            </form>
          </div>

          <div className={style.previewContainer}>
            <h1 className={style.title}>Preview</h1>
            <h3>Name: {input.name}</h3>
            <h4>Description: {input.description}</h4>
            <p>Released date: {input.released}</p>
            <p>Rating: {input.rating}</p>
            <p>Platforms:</p>
            {input.platforms.map((plat) => (
              <button
                className={style.button}
                key={plat}
                onClick={() => deleteHandlerPlatform(plat)}
                name="platform"
              >
                {plat}
              </button>
            ))}
            <p>Genres:</p>
            {input.genres.map((gen) => (
              <button
                className={style.button}
                key={gen}
                onClick={() => deleteHandlerGenre(gen)}
                name="genre"
              >
                {gen}
              </button>
            ))}
            <p>Image:</p>
            <img
              className={style.imagePreview}
              src={
                input.image
                  ? input.image
                  : "https://freesvg.org/img/Image-Not-Found.png"
              }
              alt="notfound"
            ></img>
          </div>
        </div>
      </>
    );
  }
}

export default Form;
