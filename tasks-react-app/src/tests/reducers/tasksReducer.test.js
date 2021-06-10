import { taskReducer } from "../../reducers/tasksReducer";
import { demoTasks } from "../fixtures/demoTasks";

describe('test tasks reducer', () => {

    const newTask = {
        id: demoTasks.length + 1,
        title: "new todo",
        desc: "new todo desc",
        done: true
    }

    test('should return default state', () => {
        const state = taskReducer(demoTasks, {})
        expect(state).toEqual(demoTasks)
    })

    test('should add task', () => {

        const state = taskReducer(demoTasks, {
            type: "add",
            payload: newTask
        })

        expect(state).toEqual([
            ...demoTasks,
            newTask
        ])
    })

    test('should edit task', () => {
        const taskEdited = {
            id: 1,
            title: "task edited",
            desc: "task desc edited",
            done: false
        }
        const state = taskReducer(demoTasks, {
            type: "edit",
            payload: taskEdited
        })

        expect(state).toEqual(
            state.map(task => task.id === newTask.id ? newTask : task)
        )
    })
})
