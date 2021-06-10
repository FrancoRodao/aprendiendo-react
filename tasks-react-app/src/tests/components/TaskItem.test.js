import {TaskItem}from "../../components/TaskItem";
import React from 'react'
const { shallow } = require("enzyme")

describe('TaskItem tests', () => {
    test('should display component correctly', () => {
        const wrapper = shallow(<TaskItem/>)
        expect(wrapper).toMatchSnapshot()
    })

})