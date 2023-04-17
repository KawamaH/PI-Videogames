import { useSelector } from "react-redux";
import { useState } from "react";

import CardsContainer from "../../components/CardContainer/CardContainer";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loading from "../../components/Loading/Loading";
import Filter from "../../components/Filter/Filter";

const Home = () => {
  const allVideogames = useSelector((state) => state.videogames);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);
  const [order, setOrder] = useState(" ");
  const [loading, setLoading] = useState(true);


  const lastVideogameIndex = currentPage * videogamesPerPage;
  const firstVideogameIndex = lastVideogameIndex - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    firstVideogameIndex,
    lastVideogameIndex
  );

  const changeLoading = () => {
    setTimeout(() => {
      setLoading(false)
    },3000)
  }

  if(loading){
    changeLoading()
    return(
      <Loading></Loading>
    )
  } else {

  return (
    <div>
      <Filter setCurrentPage={setCurrentPage} setOrder={setOrder}></Filter>
      <SearchBar setLoading={setLoading} setCurrentPage={setCurrentPage} ></SearchBar>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalVideogames={allVideogames.length}
        videogamesPerPage={videogamesPerPage}
      ></Pagination>
      <CardsContainer videogames={currentVideogames}></CardsContainer>
    </div>
  );
  }
};

export default Home;
