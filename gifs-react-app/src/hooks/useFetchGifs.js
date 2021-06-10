import { useState, useEffect } from 'react'
import getGifs from '../helpers/getGifs'

const useFetchGifs  = (category)=>{
    const [state, setState] = useState({
        gifs: [],
        loading: true
    })

    useEffect(() => {
        getGifs(category)
            .then(gifs => setState({
                gifs,
                loading: false
            }))
    }, [category])

    return state
}

export default useFetchGifs