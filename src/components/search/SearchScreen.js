import React, { useMemo, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';


export const SearchScreen = ({ history }) => {
    //hook para obtener la location o sino importarlo como el history
    const location = useLocation();
    // para usar el search instalar queryString,pero se obtiene en string debo parsearlo
    //al desestructurar location.search parseado se igual a un "" para evita el error ya que por default quedaria undefined
    const { q = "" } = queryString.parse(location.search)
    //console.log(q)

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const { searchText } = formValues;
    // solo se dispara la funcion al hacer enter o cuando el query cambia
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])
    //const heroesFiltered = getHeroesByName(searchText) ;



    const handleSearch = (e) => {
        e.preventDefault();
        //filtro por el url implementar un query string, permite mantener la historia
        //inserta en la url 
        history.push(`?q=${searchText}`);
        //como hacer para leer ese query
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />


                    <form onSubmit={handleSearch}>

                        <input
                            type="text"
                            placeholder="Find your hero"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}

                        />
                        <button
                            type="submit"
                            className="btn  m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>


                    </form>

                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {/*  al no encontrar ningun resultado no debe de aparecer la caja realiza la validacion */}
                    {
                        (q === '')
                        &&
                        <div className="alert alert-info">
                            Searh a hero
                          </div>

                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            There is no a hero with {q}
                        </div>

                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>
            </div>

        </div>
    )
}
