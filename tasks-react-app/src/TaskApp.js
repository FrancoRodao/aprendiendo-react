import React, { useEffect, useReducer } from 'react'
import { taskReducer } from "./reducers/tasksReducer";
import AddTask from './components/AddTask'
import { TaskItem } from './components/TaskItem'
import { useForm } from './hooks/useForm'

const initialState = JSON.parse(localStorage.getItem("tasks")) || []

const TaskApp = () => {

    const [tasks, dispatch] = useReducer(taskReducer, initialState)
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const [formValues, handleInputChange] = useForm({
        title: "",
        desc: "",
        done: false
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
       dispatch({
           type: "add",
           payload: {
               id: tasks.length + 1,
               ...formValues
           }
       })
    }

    return (
        <>
            <h1>Tasks APP</h1>

            <AddTask handleSubmit={handleSubmit} handleInputChange={handleInputChange} values={formValues} />
            
            {
                tasks.map(task => <TaskItem {...task} key={task.id} dispatch={dispatch} task={task}/>)
            }
        </>
    )
}

export default TaskApp