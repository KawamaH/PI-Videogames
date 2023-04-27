import  Home  from "../src/views/Home/Home.jsx";
import  Landing  from "../src/views/Landing/Landing";
import  Form  from "../src/views/Form/Form";
import  Detail  from "../src/views/Detail/Detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, getGenres, getPlatforms } from "./redux/actions.js";
import './App.css';

import {Route} from "react-router-dom";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getVideogames())
    dispatch(getGenres())
    dispatch(getPlatforms())
 },[dispatch])

  
  return (
    <div className="App">
      <Route path="/" exact component={Landing}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/home/:id" exact component={Detail}/>
      <Route path='/create' exact component={Form}/>
    </div>  
  );
}

export default App;
