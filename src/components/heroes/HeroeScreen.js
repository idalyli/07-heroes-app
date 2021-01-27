import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById'
export const HeroeScreen = ({history}) => {
    //extraer parametros de una url
    const { heroeId } = useParams();

/*cualquier cambio que haga  se dispara nuevamente el procedimiento para obtener
 los heroes, esto solo deberia llamarse si el publisher cambia, para ello se puede usar useMemo*/
 
 const hero=useMemo(() => getHeroById(heroeId), [heroeId]);
    //const hero = getHeroById(heroeId)

    //valida que si no existe el heroe redirija a la pagina de marvel
    if (!hero) {
        return <Redirect to="/" />
    }

    const handleReturn=({})=>{
        if(history.length<=2){
            history.push('/')
        }
        else{
            history.goBack();


        }
       
    }


    const {
        superhero,
        alter_ego,
        first_appearance,
        characters,
        publisher
    } = hero;


    return (
        <div className="row mt-5">
            <div className="col-4 ">
                <img
                    src={`../assets/heroes/${heroeId}.jpg`}
                    at={superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publisher:</b>{publisher}</li>
                    <li className="list-group-item"><b>First appearance:</b>{first_appearance}</li>
                </ul>
                <h5>Characters</h5>
                <p>{characters}</p>
                <button className="btn btn-outline-info"
                onClick={handleReturn}>Return</button>

            </div>

        </div>
    )
}
