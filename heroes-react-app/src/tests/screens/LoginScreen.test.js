import { mount } from "enzyme"
import { AuthContext } from "../../auth/authContext"
import LoginScreen from "../../screens/LoginScreen"
import { types } from "../../types/types"

describe('LoginScreen tests', () => {

    const context = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    
    const historyMock = {
        push: jest.fn()
    }

    test('should login user', () => {
        const wrapper = mount(
            <AuthContext.Provider value={context}>

                <LoginScreen history={historyMock} />

            </AuthContext.Provider>
        )

        expect(wrapper.find("button").text().toLowerCase())
              .toBe("login")
        
        const handleLogin = wrapper.find("button").prop("onClick")
        handleLogin()

        expect(context.dispatch).toBeCalledWith({
            type: types.login,
            payload: {
                name: "Franco"
            }
        })
        
        //the user did not have a last path
        expect(historyMock.push).toBeCalledWith("/")

        //set a new last path
        localStorage.setItem("lastPath", "/dc")
        handleLogin()
        expect(historyMock.push).toBeCalledWith("/dc")

    })

})
