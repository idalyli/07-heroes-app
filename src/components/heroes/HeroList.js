import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

/*cualquier cambio que haga  se dispara nuevamente el procedimiento para obtener
 los heroes, esto solo deberia llamarse si el publisher cambia, para ello se puede usar useMemo*/
 const heroes=useMemo(() => getHeroesByPublisher(publisher), [publisher]);

 
 // const heroes = getHeroesByPublisher(publisher);


    return (
        <div className="row g-1 animate__animated animate__fadeIn ">

            {
                heroes.map(hero => (
                   <HeroCard key={hero.id} 
                       {...hero}
                       />
     
                ))

            }

        </div>

    )
}
