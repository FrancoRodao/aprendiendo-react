import { mount } from "enzyme"
import React from 'react'
import { MemoryRouter } from "react-router-dom"
import { PrivateRoutes } from "../../routers/PrivateRoutes"

describe('PublicRoutes tests', () => {

    const restProps = {
        location: {
            pathname: "marvel"
        }
    }
    
    test('should redirect to login if not authenticated', () => {
        const wrapper = mount(
        <MemoryRouter>
            <PrivateRoutes
                isAuthenticated={false}
                Component={()=><span>hola!</span>}
                {...restProps}
            />
        </MemoryRouter>
        )

        expect(wrapper.find('span').exists()).toBe(false)
    })
    
})
