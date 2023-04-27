import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getVideogamesDetail } from "../../redux/actions";
import style from "./VideogameDetail.module.css";
import Loading from "../Loading/Loading";

function VideogameDetail() {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameDetail);

  const { id } = useParams();

  console.log(videogame);

  useEffect(() => {
    dispatch(getVideogamesDetail(id));
    return dispatch(clearDetail());
  }, [dispatch, id]);

  if (!videogame[0]) {
    return <Loading></Loading>;
  } else {
    return (
      <div className={style.container}>
        <img
          className={style.img}
          src={videogame[0].image}
          alt="imgdefault"
        ></img>
        <h1 className={style.h1}>{videogame[0].name} </h1>
        <div className={style.containerText}>
          <h2>
            <span className={style.subtitleText}>ID:</span>
            {videogame[0].id}{" "}
          </h2>
          <h2><span className={style.subtitleText}>Platforms:</span>{videogame[0].platforms.join(", ")}</h2>
          <h2><span className={style.subtitleText}>Released:</span>{videogame[0].released}</h2>
          <h2><span className={style.subtitleText}>Rating:</span>{videogame[0].rating}</h2>
          <h2><span className={style.subtitleText}>Genres:</span>
            {!videogame[0].createinDb
              ? videogame[0].genres.join(", ")
              : videogame[0].Genres.map((v) => v.name).join(", ")}
          </h2>
          <h2><span className={style.subtitleText}>Description:</span>
            {videogame[0].description.replace(/<\/?[^>]+(>|$)/g, "")}
          </h2>
        </div>

        <br />
        <Link to="/home">
          <button className={style.button}> HOME!</button>
        </Link>
        <br />
      </div>
    );
  }
}

export default VideogameDetail;
