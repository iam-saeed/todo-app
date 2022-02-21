import React, { useState } from 'react'
import '../styles/Todo.css';

const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.editTask(props.id, newName, setEditing)
    setNewName("")
    setEditing(false)
  }
  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>New name for {props.name} </label>
        <input id={props.id} className="todo-text" type="text" onChange={handleChange} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit" className="btn todo-save">
          Save
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="small-stack">
      <div className="c-cb">
      <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
      <label className="todo-label" htmlFor={props.id}>
        {props.name}
      </label>
    </div>
    <div className="btn-group">
      <button type="button" className="btn" onClick={() => setEditing(true)}>
        Edit
      </button>
      <button type="button" className="btn" onClick={() => props.deleteTask(props.id)}>
        Delete 
      </button>
    </div>
    </div>
  )
  return (
    <li className="todo-0">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}

export default Todo