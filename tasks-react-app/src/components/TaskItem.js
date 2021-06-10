import React from 'react'

export const TaskItem = ({title, desc, done, dispatch, task})=>{
    
    const handleChange = ({target})=>{
        dispatch({
            type: "edit",
            payload: {
                ...task,
                //checkbox validation
                [target.name]: target.value === "on" ? target.checked : target.value
            }
        })
    }

    return (
        <div>
            <h3>{title}</h3>
            <p>{desc}</p>

            <p>done:</p> 
            <input type="checkbox" 
                        name="done" 
                        checked={done} 
                        onChange={handleChange}>
            </input>
        </div>
    )
}