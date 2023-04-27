import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName, getVideogames } from "../../redux/actions";
import style from './SearchBar.module.css'
import Loading from "../Loading/Loading";

function SearchBar({setLoading,setCurrentPage}) {
  const dispatch = useDispatch();
  const [videogameName, setvideogameName] = useState("");


  const handleInputChange = (e) => {
    setvideogameName(e.target.value);
    setCurrentPage(1)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getVideogameByName(videogameName));
    setvideogameName("");
  };

  const handleReset = (e) => {
    e.preventDefault()
    setLoading(true)
    dispatch(getVideogames())
  }

  const changeLoading = () => {
    setTimeout(() => {
      setLoading(false)
    },1000)
  }
  
  if(!setLoading){
    changeLoading()
    return(
      <Loading></Loading>
    )
  } else {
  
  return (
    <div>
      <form>
        <input
          className={style.input}
          onChange={(e) => handleInputChange(e)}
          value={videogameName}
          placeholder="Search videogame"
        ></input>
        <button className={style.button} onClick={e => handleSubmit(e)} type= 'submit'>Search</button>
        <button className={style.button} onClick={e => handleReset(e)}>Reset</button>
      </form>
    </div>
  );
  }
}

export default SearchBar;
