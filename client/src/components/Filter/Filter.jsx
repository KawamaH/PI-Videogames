import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, filterBySource, orderBy } from "../../redux/actions";
import style from "./Filter.module.css";

function Filter({ setCurrentPage }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const handleOrderBy = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterBySource = (e) => {
    dispatch(filterBySource(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterByGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={style.container}>
      <select name="Order by" onChange={(e) => handleOrderBy(e)}>
      <option key={0} value="" disabled selected>
            Order by
          </option>
        <optgroup label="Alphabet">  
          <option key={2} value="asc">
            Ascendant
          </option>
          <option key={3} value="des">
            Descendant
          </option>
        </optgroup>
        <optgroup label="Rating">
          <option key={4} value="ratingAsc">
            Worse to better
          </option>
          <option key={5} value="ratingDes">
            Better to worse
          </option>
        </optgroup>
      </select>
      <select name="Filter by source" onChange={(e) => handleFilterBySource(e)}>
        <optgroup label="Created">
          <option key={0} value="" disabled selected>
            Select source
          </option>
          <option key={1} value="all">
            All
          </option>
          <option key={2} value="created">
            Database
          </option>
          <option key={3} value="api">
            Api
          </option>
        </optgroup>
      </select>
      <select name="Filter by genre" onChange={(e) => handleFilterByGenre(e)}>
        <optgroup label="Genre">
          <option key={0} value="" disabled selected>
            Select genre
          </option>
          <option key={1 + "e"} value="all">
            All
          </option>
          {genres.data.map((e) => {
            return (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            );
          })}
        </optgroup>
      </select>
    </div>
  );
}

export default Filter;
