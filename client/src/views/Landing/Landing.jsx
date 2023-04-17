import React from 'react'
import { Link } from "react-router-dom";
import style from "./Landing.module.css"

function Landing() {
  return (
    <div>
    <div className = {style.container}>
      <div className={style.containerButton}>
      <p>pene</p>
        <Link to="/home">
            <button className={style.button}> TO HOME </button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Landing