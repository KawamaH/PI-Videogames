import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import gamezonelogo from './gamezonelogo.png'

function Landing() {
  return (
    <>
    <img className={style.logo} src={gamezonelogo} alt="logo"></img>
      <div className={style.container}>
        <h1>Welcome to game zone!</h1>
        <h2>
          {" "}
          In this web application you can search for videogame information,
          filter it and even create it
        </h2>
        <img
          className={style.gifLanding}
          src="https://i.gifer.com/origin/b1/b18107f7e40e16f23be5f36416c569fa_w200.gif"
          alt="kirby"
        ></img>

        <br />
        <Link to="/home">
          <button className={style.button}> START! </button>
        </Link>
      </div>
    </>
  );
}

export default Landing;
