import React from 'react'
import { mount } from "enzyme"
import { AuthContext } from "../../auth/authContext"
import HeroeCard from "../../components/heroes/HeroeCard";
import AppRouter from "../../routers/AppRoutes"
import { Navbar } from '../../components/ui/Navbar';

describe('AppRoutes tests', () => {
    
    test('should display login if not authenticated', () => {

        const context = {
            user: {
                logged: false
            },
            dispatch: jest.fn()
        }
        
        const wrapper = mount(
            <AuthContext.Provider value={ context }>
                <AppRouter/>
            </AuthContext.Provider>
        )

        expect(wrapper.find(".container").find("h2").text())
              .toBe("login screen")
    })
    
    test('should display private routes if authenticated', () => {

        const context = {
            user: {
                name: "Franco",
                logged: true
            },
            dispatch: jest.fn()
        }
        
        const wrapper = mount(
            <AuthContext.Provider value={ context }>
                <AppRouter/>
            </AuthContext.Provider>
        )
        
        //name in navbar
        expect(wrapper.find(Navbar).find("span").text()).toBe(context.user.name)
        //heros cards
        expect(wrapper.find(HeroeCard).exists()).toBe(true)

    })

})
