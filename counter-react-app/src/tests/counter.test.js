import React from 'react'
import Counter from "../Counter";
import { shallow } from "enzyme";

describe('counter component', () => {
    const counterValue = 3
    let wrapper = shallow(<Counter value={counterValue}></Counter>);

    //reset counter
    beforeEach(()=>{
        wrapper = shallow(<Counter value={counterValue}></Counter>)
    })
    
    test('should show counter component snapshot', () => {
        const wrapper = shallow(<Counter></Counter>)
        expect(wrapper).toMatchSnapshot()
    })

    test('should show a number sent by props', () => {
        const counterValue = 3
        const textCounter = wrapper.find("p").text()
        expect(textCounter).toBe(`valor actual: ${counterValue}`)
    })

    test('should increment counter on press button +1', () => {
       wrapper.find('button').at(0).simulate("click")
       const textCounter = wrapper.find("p").text()
       expect(textCounter).toBe(`valor actual: ${counterValue+1}`)
    })

    test('should increment counter on press button -1', () => {
        wrapper.find('button').at(1).simulate("click")
        const textCounter = wrapper.find("p").text()
        expect(textCounter).toBe(`valor actual: ${counterValue-1}`)
     })
    
})
