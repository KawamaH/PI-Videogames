import style from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <div className={style.card}>
            <Link to = {`/home/${props.id}`}>
                <img className={style.img} src = {props.image} alt='videogame'></img>
                <h2 className={style.h2}>{props.name}</h2>
                <p className={style.p}>{props.genre}</p>
            </Link>
        </div>
        
    )
}

export default Card;