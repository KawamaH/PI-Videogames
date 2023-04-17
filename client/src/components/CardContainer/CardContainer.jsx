import Card from "../Card/Card"
import style from "./CardContainer.module.css"
import Loading from "../Loading/Loading"

const CardContainer = (videogames) => {
    const arrayVideogames = Object.values(videogames)
    
    
    const arrayVideogamesFlat = arrayVideogames.flat()
    console.log(arrayVideogamesFlat)
    if(!arrayVideogamesFlat){
        return(
            <Loading></Loading>
        )
    } else {
    return (
        <div className={style.container}>
            {arrayVideogamesFlat.map(videogame=>{
                return <Card
                    key = {videogame.id}
                    id = {videogame.id}
                    name= {videogame.name ? videogame.name : "Videogame name"}
                    image= {videogame.image ? videogame.image: "https://img.freepik.com/premium-vector/pixel-art-joystick-video-game-old-vector-icon-8bit-game-white-background_360488-483.jpg"}
                    genre = {!videogame.createdInDb? videogame.genres : videogame.Genres.map(v => v.name +" ")}
                />
            })

            }
        </div>
    )
    }
}

export default CardContainer;