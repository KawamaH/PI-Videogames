import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./Home.module.css";
import CardsContainer from "../../components/CardContainer/CardContainer";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loading from "../../components/Loading/Loading";
import Filter from "../../components/Filter/Filter";
import { Link } from "react-router-dom";

const Home = () => {
  const allVideogames = useSelector((state) => state.videogames);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);
  const [loading, setLoading] = useState(true);

  const lastVideogameIndex = currentPage * videogamesPerPage;
  const firstVideogameIndex = lastVideogameIndex - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    firstVideogameIndex,
    lastVideogameIndex
  );

  const changeLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    changeLoading();
    return <Loading></Loading>;
  } else {
    return (
      <div className={style.container}>
        <Link to="/create">
          <button className={style.button}> CREATE VIDEOGAME! </button>
        </Link>
        <div className={style.filterContainer}>
          <Filter setCurrentPage={setCurrentPage}></Filter>
        </div>
        <div className={style.searchContainer}>
          <SearchBar
            setLoading={setLoading}
            setCurrentPage={setCurrentPage}
          ></SearchBar>
        </div>
        <div>
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalVideogames={allVideogames.length}
            videogamesPerPage={videogamesPerPage}
          ></Pagination>
        </div>
        <br />
        <CardsContainer videogames={currentVideogames}></CardsContainer>
      </div>
    );
  }
};

export default Home;
