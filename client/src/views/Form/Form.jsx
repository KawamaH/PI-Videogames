import { eventNames } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getGenres } from "../../redux/actions";

function Form() {
    const dispatch = useDispatch();
    const  genres = useSelector((state) => state.genres)
    const videogames = useSelector((state) => state.allVideogames)

    const [input, setInput] = useState({
        name:'',
        description:'',
        platforms:[],
        released:'',
        rating:'',
        genre: [],
        image:'',
    });

    const [errors, setErrors] = useState({
        name:'',
        description:'',
        platforms:[],
        released:'',
        rating:'',
        genre: [],
        image:'',
    })

    useEffect(() => {
        dispatch(createVideogame());
        dispatch(getGenres());
    })


    const changeHandler = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const SelectGenreHandler = (e) => {
        setInput({...input, genre: [...input.genre,e.target.value]})
    };

    function deleteHandler (elem) {
        setInput({
            ...input,
            genre: input.genre.filter((gen) => gen !== elem)
        });
    }

    const submitHandler = () => {
        e.preventDafault();
        if(!errors.name && !errors.description && !errors.platforms && !errors.released && !errors.rating && !errors.image && input.genre.length){
            dispatch(createVideogame({
                name: input.name,
                description: input.description,
                platforms: input.platforms,
                released: input.released,
                rating: input.rating,
                genre: input.genre,
                image: input.image
            }))
        }
    }

    const validate = () => {
        if (errors)
    }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
          autoComplete="off"
        ></input>
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={form.description}
          onChange={changeHandler}
          name="description"
          autoComplete="off"
        ></input>
      </div>
      <div>
        <label>Platforms:</label>
        <input
          type="text"
          value={form.platforms}
          onChange={changeHandler}
          name="platforms"
          autoComplete="off"
        ></input>
      </div>
      <div>
        <label>Released date:</label>\
        <input
          type="text"
          value={form.released}
          onChange={changeHandler}
          name="released"
          autoComplete="off"
        ></input>
      </div>
      <div>
        <label>Rating: </label>
        <input
          type="text"
          value={form.rating}
          onChange={changeHandler}
          name="rating"
          autoComplete="off"
        ></input>
      </div>
      <div>
        {form.genre.map(e => (
            <div>
                <p>{e}</p>
                <button className={style.delete} onClick={deleteHandler} value={e}>x</button>
            </div>
        ))}
      </div>
      <div>
        <label>Image:</label>
        <input
          type="text"
          value={form.image}
          onChange={changeHandler}
          name="image"
          autoComplete="off"
        ></input>
        
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default Form;
