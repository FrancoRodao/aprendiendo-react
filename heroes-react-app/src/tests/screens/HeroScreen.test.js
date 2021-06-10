import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import HeroScreen from "../../screens/HeroScreen"
import { getHeroeById } from "../../selectors/getHeroeById"

describe('HeroScreen tests', () => {

    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    }
    const heroId = "dc-batman"

    const heroe = getHeroeById(heroId)
    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = heroe

    const wrapper = mount(
        <MemoryRouter initialEntries={[{ pathname: `/heroe/${heroId}` }]}>
            <Route path="/heroe/:heroeId">
                <HeroScreen history={historyMock} />
            </Route>
        </MemoryRouter>
    )

    test('should return a hero screen with hero dates', () => {

        expect(wrapper.find("h3").text()).toBe(heroe.superhero)

    })

    test('should redirect to / (default path) if hero id dont exists', () => {

        const wrapper = mount(
            <MemoryRouter
                initialEntries={[
                    { pathname: `/heroe/${heroId}_dont_exists` }
                ]}>

                <Route path="/heroe/:heroeId">
                    <HeroScreen history={historyMock} />
                </Route>

            </MemoryRouter>
        )
        
        const location = global.window.location.pathname
        expect(location).toBe("/")
    })

    test('should return to back page if click in back button', () => {
        
        wrapper.find("button").simulate("click")
        expect(historyMock.goBack).toBeCalledTimes(1)

    })
    

})
