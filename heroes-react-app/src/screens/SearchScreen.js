import React, { useState } from 'react'
import { useLocation } from 'react-router'
import HeroeCard from '../components/heroes/HeroeCard'
import { getHeroesSearch } from '../selectors/getHeroesSearch'
import queryString from "querystring";

export default function SearchScreen({ history }) {

    const location = useLocation()
    const { query = '' } = queryString.parse(location.search)
    const [inputValue, setInputValue] = useState(query)

    const [heroesFiltered, setHeroesFiltered] = useState(getHeroesSearch(query))

    const handleSearch = (e) => {
        e.preventDefault()
        
        const searchWords = e.target[0].value

        setHeroesFiltered(
            getHeroesSearch(searchWords)
        )

        history.push(`?&query=${searchWords}`)
    }

    const inputChangeHandler = ({ target }) => 
                                    setInputValue(target.value)


    return (
        <div className="mt-5">
            <div className="row">

                <div className="col-5">
                    <h4>Search</h4>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            value={inputValue}
                            onChange={inputChangeHandler}
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                            </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>
                        Results ({heroesFiltered.length}):
                    </h4>
                    <hr />
                    {
                        heroesFiltered.length > 0 ?

                            heroesFiltered.map(heroe =>
                                <HeroeCard
                                    key={heroe.id}
                                    {...heroe}
                                />
                            )

                            :

                            <div className="alert alert-danger">
                                There is no a hero with <strong>{query}</strong>
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}
