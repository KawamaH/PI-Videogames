import style from './Card.module.css'
import { useHistory } from 'react-router-dom'

const Card = (props) => {
    let history = useHistory();
    const moveToDetail = () =>{
        history.push(`/home/${props.id}`)
    }

    return (
        
        <div className={style.card} onClick={moveToDetail}>  
                <img className={style.img} src = {!props.image? 'https://www.aquecimentoindustrial.com.br/wp-content/plugins/interactive-3d-flipbook-powered-physics-engine/assets/images/dark-loader.gif' : props.image} alt='videogame'></img>
                <h2 className={style.h2}>{props.name}</h2>
                <p className={style.p}>{props.genre}</p>    
        </div>
        
    )
}

export default Card;