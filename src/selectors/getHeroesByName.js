import { heroes } from "../data/heroes";


export const getHeroesByName = (name="") => {

    if(name===""){
        return []
    }
    //para no hacer exepcion entre mayusculas y minusculas
    name = name.toLocaleLowerCase();
    return heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(name));
}