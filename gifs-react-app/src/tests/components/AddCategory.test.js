import React from 'react'
import "@testing-library/jest-dom"
import { shallow } from "enzyme"
import AddCategory from "../../components/AddCategory"

describe('AddCategory test component', () => {

    const setCategories = jest.fn()
    let wrapper = shallow(<AddCategory setCategories={setCategories}></AddCategory>)

    beforeEach(() => {
        jest.clearAllMocks()
        //re-initialize function for the auto-completed
        wrapper = shallow(<AddCategory setCategories={setCategories}></AddCategory>)
    })

    test('should display snapshot correctly', () => {

        expect(wrapper).toMatchSnapshot()

    })

    test('should change input', () => {

        const input = wrapper.find("input")
        const value = "hello world"
        input.simulate("change", { target: { value } })

    })

    test("should not submit the form", () => {

        wrapper.find("form").simulate("submit", { preventDefault: () => { } })
        expect(setCategories).not.toHaveBeenCalled()

    })

    test('should submit the form and clear input value', () => {

        //simulate input value change
        const input = wrapper.find("input")
        const value = "hello world"
        input.simulate("change", { target: { value } })

        //simulate form submit
        wrapper.find("form").simulate("submit", { preventDefault: () => { } })

        //input value must be ""
        expect(setCategories).toHaveBeenCalledTimes(1)
        expect(input.prop("value")).toBe("")
    })

})
