import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function AddCategory({setCategories}) {

    const [inputValue, setInputValue] = useState("")

    const handleOnChange = (e)=>setInputValue(e.target.value)

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(inputValue.length === 0) return
        setCategories(categories =>[inputValue, ...categories])
        setInputValue('')
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleOnChange}/>
        </form>
        </>
    )
}

AddCategory.propTypes  = {
    setCategories: PropTypes.func.isRequired
}
