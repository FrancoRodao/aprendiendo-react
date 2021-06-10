import { mount} from "enzyme"
import { MemoryRouter } from "react-router"
import { AuthContext } from "../../auth/authContext"
import DashboardRoutes from "../../routers/DashboardRoutes"

describe('DashboardRoutes tests', () => {
    
    const context = {
        user: {
            name: "Franco",
            logged: true
        },
        dispatch: jest.fn()
    }
    test('should display dashboard/private routes', () => {
        const wrapper = mount(
            <AuthContext.Provider value={context} >
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        
        expect(wrapper).toMatchSnapshot()
    })

})
