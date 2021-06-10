import { heroes } from '../data/heroes'

export const getHeroesSearch = (searchWords) => {
    searchWords = searchWords.toLowerCase()
    if(searchWords === ''){
        return heroes
    }

    const heroesFinded = heroes.filter(heroe => 
        heroe.superhero.toLowerCase().includes(searchWords) 
        || 
        heroe.characters.toLowerCase().includes(searchWords)
    )

    return heroesFinded
}