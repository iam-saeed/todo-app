import React, { useState } from 'react'
import '../styles/Form.css'

const Form = (props) => {
  const [name, setName] = useState('')

  const handleChange = (e) => {
    setName(e.target.value)
    console.log(name)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(name)
    setName('')
  }

  const disabled  = name.length === 0 ? true : false;

  return (
    <form onSubmit={handleSubmit}>
    <h2 className="label-wrapper">
      <label htmlFor="new-todo-input">What needs to be done?</label>
    </h2>
    <input 
    type="text"
    id="new-todo-input"
    value={name}
    autoComplete="off"
    onChange={handleChange}
    />
    <button id="add-btn" disabled={disabled}>Add</button>
    </form>
  )
}

export default Form