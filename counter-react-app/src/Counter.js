import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Counter = ({value = 0})=>{
  
  const [counter, setCounter] = useState(value)
  const sumar = () => setCounter(counter+1)

  const restar = () => setCounter(counter-1)

  return (
  <>
    <h1>Counter app</h1>
    <p>valor actual: {counter}</p>
    <button onClick={sumar}>+1</button>
    <button onClick={restar}>-1</button>
  </>)
}

Counter.propTypes = {
  value: PropTypes.number
}

export default Counter;
