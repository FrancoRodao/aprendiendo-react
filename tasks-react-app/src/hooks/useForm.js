import { useState } from 'react'

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState)

    const handleInputChange = ({ target }) => {
        setValues(values => {
            return {
                ...values,
                //checkbox validation
                [target.name]: target.value === "on" ? target.checked : target.value
            }
        })
    }

    return [values, handleInputChange]

}