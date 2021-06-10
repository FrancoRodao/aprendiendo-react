import React from 'react'
import { shallow } from "enzyme";
import GifApp from "../GifApp";

describe('test GifApp component "app container" )', () => {
    const intialCategories = ["testing"]
    let wrapper = shallow(<GifApp initialCategories={intialCategories}></GifApp>)

    test('should display snapshot correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    test('should display GifGrids components', () => {
        expect(wrapper.find("GifGrid").length).toBe(intialCategories.length)
    })
    
    
})
