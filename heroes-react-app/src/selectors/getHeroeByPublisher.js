import { heroes } from "../data/heroes"

export const getHeroeByPublisher = publisher => {
    //validation
    const validPublishers = ['DC Comics', 'Marvel Comics']
    if(!validPublishers.includes(publisher)) throw new Error("invalid publisher")

    return heroes.filter(heroe => heroe.publisher === publisher)
}