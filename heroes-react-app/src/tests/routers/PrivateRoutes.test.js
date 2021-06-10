import { mount } from "enzyme"
import React from 'react'
import { MemoryRouter } from "react-router-dom"
import { PrivateRoutes } from "../../routers/PrivateRoutes"

describe('PrivateRouter tests', () => {

    const restProps = {
        location: {
            pathname: "marvel"
        }
    }

    Storage.prototype.setItem = jest.fn()
    
    test('should return the component if it is authenticated and save local storage', () => {
        const wrapper = mount(
        <MemoryRouter>
            <PrivateRoutes
                isAuthenticated={true}
                Component={()=><span>hola!</span>}
                {...restProps}
            />
        </MemoryRouter>
        )

        expect(wrapper.find('span').exists()).toBe(true)
        
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", restProps.location.pathname)
    })

    test('should block component/page if not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoutes
                    isAuthenticated={false}
                    Component={()=><span>hola!</span>}
                    {...restProps}
                />
            </MemoryRouter>
        )

        expect(wrapper.find("span").exists()).toBe(false)
    })
    
})
