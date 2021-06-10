import { mount } from "enzyme"
import { MemoryRouter, Router } from "react-router"
import { AuthContext } from "../../../auth/authContext"
import { Navbar } from "../../../components/ui/Navbar"
import { types } from "../../../types/types"

describe('Navbar tests', () => {

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const context = {
        user: {
            name: "Franco",
            logged: true
        },
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={context}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('should display the name of the user', () => {

        expect(wrapper.find(".text-info").text())
            .toBe(context.user.name)

    })

    test('should logout user', () => {

        wrapper.find("button").simulate("click")
        expect(context.dispatch).toBeCalledWith({
            type: types.logout
        })

        expect(historyMock.push).toBeCalledWith("/login")
    })


})
