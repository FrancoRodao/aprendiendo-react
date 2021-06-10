import React from 'react'
import { getHeroeByPublisher } from '../../selectors/getHeroeByPublisher'
import HeroeCard from './HeroeCard'

export default function HeroeList({publisher}) {

    const heroes = getHeroeByPublisher(publisher)

    return (
        <div className="card-columns">
            { 
                heroes.map(heroe => 
                    <HeroeCard key={heroe.id} {...heroe}/>)
            }
        </div>
    )
}
