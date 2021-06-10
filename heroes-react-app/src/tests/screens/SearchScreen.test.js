import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import HeroeCard from "../../components/heroes/HeroeCard"
import SearchScreen from "../../screens/SearchScreen"
import { getHeroesSearch } from "../../selectors/getHeroesSearch"

describe('SearchScreen tests', () => {

    const historyMock = {
        push: jest.fn()
    }
    
    const searchWords = "Batman"

    test('should search a heroe', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <SearchScreen history={historyMock}/>
            </MemoryRouter>
        )
        
        wrapper.find("input").simulate("change", {
            target: {
                value: searchWords
            }
        })

        wrapper.find("form").simulate("submit", {
            preventDefault: jest.fn(),
            target: [{
                value: searchWords
            }]
        })

        const heroesFilteredMock = getHeroesSearch(searchWords)
        expect(wrapper.find(HeroeCard).length).toBe(heroesFilteredMock.length)
        expect(historyMock.push).toHaveBeenLastCalledWith(`?&query=${searchWords}`)
    })

    test('should show results by query search in url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[
                `/search?&query=${searchWords}`
            ]}>
                <SearchScreen history={historyMock}/>
            </MemoryRouter>
        )

        const heroesFindedMock = getHeroesSearch(searchWords)

        expect(wrapper.find("input").prop("value")).toBe(searchWords)
        expect(wrapper.find(HeroeCard).length)
              .toBe(heroesFindedMock.length)
        
    })
    
    test('should search a heroe that doesnt exists', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <SearchScreen history={historyMock}/>
            </MemoryRouter>
        )
        
        const searchWords = "ZzzzzZZzz"
        wrapper.find("input").simulate("change", {
            target: {
                value: searchWords
            }
        })

        wrapper.find("form").simulate("submit", {
            preventDefault: jest.fn(),
            target: [{
                value: searchWords
            }]
        })

        const heroesFilteredMock = getHeroesSearch(searchWords)
        expect(wrapper.find(HeroeCard).length)
              .toBe(heroesFilteredMock.length)

        expect(wrapper.find(".alert-danger").exists()).toBe(true)
    })
    

})
