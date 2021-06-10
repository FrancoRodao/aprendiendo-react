import React, { useReducer } from 'react'
import { shallow } from "enzyme";
import TaskApp from "../TaskApp";
import { renderHook, act } from '@testing-library/react-hooks'
import { taskReducer } from '../reducers/tasksReducer';

describe('TaskApp component test', () => {

    test('should display a snapshot correctly', () => {
        const wrapper = shallow(<TaskApp/>)
        expect(wrapper).toMatchSnapshot()
    })
    
    test('should add new task | test handleSubmit function', () => {
        const initialState = []
        const {result} = renderHook(() => useReducer(taskReducer, initialState))
        const [tasks, dispatch] = result.current

        const newTask = {
            id: tasks.length + 1,
            title: "new title",
            desc: "new desc",
            done: false
        }

        act(()=>{
            dispatch({
                type: "add",
                payload: {
                    ...newTask
                }
            })
        })

        const [newStateTasks] = result.current
        expect(newStateTasks).toEqual([
            ...initialState,
            newTask
        ])
    })
    
})
