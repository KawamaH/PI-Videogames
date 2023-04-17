import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { clearDetail, getVideogamesDetail } from '../../redux/actions';
import style from './VideogameDetail.module.css'
import Loading from '../Loading/Loading';

function VideogameDetail() {

    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogameDetail)

    const {id} = useParams();
    

    console.log(videogame)

    useEffect(() => {
      dispatch(getVideogamesDetail(id))
      return dispatch(clearDetail())
    },[dispatch,id])

    
  if(!videogame[0]) {
    return (
      <Loading></Loading>
    )
  } else {
    

  return (
    <div className={style.container}>
        <Link to = '/home'>
        <button className={style.button}>BACK HOME</button>
        </Link>
        <div className = {style.containerText}>
            
            <h1>{videogame[0].name} </h1>
            <h2> ID:{videogame[0].id} </h2>
            <h2> Platforms: {videogame[0].platforms.join(', ')}</h2>
            <h2> Released: {videogame[0].released}</h2>
            <h2> Rating: {videogame[0].rating}</h2>
            <h2> Genres: {!videogame[0].createInDb? videogame[0].genres.join(', ') : videogame.Genres.map(v => v.name + '')}</h2>
            <h2> Description: {videogame[0].description}</h2>
            <img src={videogame[0].image} alt='imgdefault'></img>
        </div>

    </div>
  )
  }
}

export default VideogameDetail