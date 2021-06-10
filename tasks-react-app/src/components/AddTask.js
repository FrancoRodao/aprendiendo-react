import React from 'react'

export default function AddTask({ handleSubmit, handleInputChange, values }) {
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Title: </p> <input onChange={handleInputChange} name="title" />
                <p>Desc: </p> <input onChange={handleInputChange} name="desc" />
                <p>Done: </p> <input onChange={handleInputChange} name="done" type="checkbox" />
                <button type="submit">Add task</button>
            </form>

            <div>
            <p>Preview: </p>
            <p>Title: </p> <input readOnly value={values.title} />
            <p>Desc: </p> <input readOnly value={values.desc} />
            <p>Done: </p> <input readOnly type="checkbox" checked={values.done} />
            </div>
        </>
    )
}
