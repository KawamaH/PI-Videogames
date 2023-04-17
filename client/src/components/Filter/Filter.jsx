import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByAbc, filterByGenre, filterByRating, filterBySource, getGenres, getVideogames } from '../../redux/actions';
import style from './Filter.module.css'

function Filter({setCurrentPage,setOrder}) {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getGenres())
    },[dispatch])
    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch])

    const genres = useSelector((state) => state.genres)

   

    const handleFilterByAbc = (e) =>{
        e.preventDefault()
        dispatch(filterByAbc(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleFilterBySource = (e) => {
        dispatch(filterBySource(e.target.value))
    }

    const handleFilterByGenre = (e) => {
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterByRating = (e) => {
        e.preventDefault()
        dispatch(filterByRating(e.target.value))
    }

  return (
    <div className={style.container}>
        <div>
            <select name='Filter by alphabet' onChange={e => handleFilterByAbc(e)}>
                <optgroup label='Alphabet'>
                    <option key ={1} value ="all">Default</option>
                    <option key ={2} value ="asc">Ascendant</option>
                    <option key ={3} value ="des">Descendant</option>
                </optgroup>
            </select>
            <select name= 'Filter by source' onChange={e=> handleFilterBySource(e)}>
                <optgroup label='Created' >
                    <option key ={1} value ="all">All</option>
                    <option key ={2} value ="created">Database</option>
                    <option key ={3} value ="api">Api</option>
                </optgroup>
            </select>
            <select name= 'Filter by rating' onChange={e=> handleFilterByRating(e)}>
                <optgroup label='Rating' >
                    <option key ={1} value ="all">All</option>
                    <option key ={2} value ="min">Worse to better</option>
                    <option key ={3} value ="max">Better to worse</option>
                </optgroup>
            </select>
            <select name= 'Filter by genre' onChange={e=> handleFilterByGenre(e)}>
                <optgroup label='Genre' >
                <option key={ 1 + "e"} value="all">All</option>
                {
                    genres.data.map(e => {
                        return(
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })
                }
                </optgroup>
            </select>
        </div>

    </div>
  )
}

export default Filter