import { heroes } from "../data/heroes"

export const getHeroeById = id => heroes.find(heroe => heroe.id === id)
