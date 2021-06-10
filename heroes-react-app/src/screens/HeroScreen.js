import React from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroeById } from '../selectors/getHeroeById'

export default function HeroScreen({ history }) {
    
    const { heroeId } = useParams()
    const heroe = getHeroeById(heroeId)

    if(!heroe){
        return <Redirect to="/"></Redirect>
    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = heroe

    const handleBack = () => {
        (history.length <= 2) ? history.push("/") : history.goBack()
    }


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    className="img-thumbnail" 
                    alt={superhero}
                    src={`../assets/heroes/${id}.jpg`}>
                </img>
            </div>

            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        <b>Alter ego: </b> {alter_ego}
                    </li>

                    <li className="list-group-item">
                        <b>Publisher: </b> {publisher}
                    </li>

                    <li className="list-group-item">
                        <b>First appearance: </b> {first_appearance}
                    </li>

                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button 
                    className="btn btn-outline-info"
                    onClick={handleBack}
                    >
                    Back
                </button>
            </div>
        </div>
    )
}
