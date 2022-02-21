
import React, { useState } from 'react';
import Todo from './components/Todo.jsx';
import Form from './components/Form.jsx';
import FilterButton from './components/FilterButton.jsx';
import { nanoid } from "nanoid";

import './App.css'


function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState("All")

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  }

  const FILTER_NAMES = Object.keys(FILTER_MAP)

  const toggleTaskCompleted = (id) => {
    const updatedTask = tasks.map(task => {
      if (id === task.id){
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTask)
  }

  const editTask = (id, newName) => {
    const editedTask = tasks.map(task => {
      if (id === task.id){
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTask)
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
    <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask} />
    ))
    const addTask = (name) => {
      const newTask = { id: "todo-" + nanoid(), name: name, completed: false }
      setTasks([...tasks, newTask])
    }
  
  const feature_list = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name}  isPressed={name === filter} setFilter={setFilter} />
  ))

    const taskNoun = taskList.length !== 1 ? "tasks" : "task";
    const alternateHeading = `${taskList.length} ${taskNoun} remaining`;
    const heading = taskList.length === 0 ? 'Nothing scheduled yet!' : alternateHeading;

  return (
    <div className="App">
      <div className="main_content">
        <h1>Daily Objective</h1>
        <Form addTask={addTask} />

        <div className="filters btn-group stack-exception">
          {feature_list}
        </div>

        <h2 id="list-heading">{heading}</h2>
        <ul className="todo-list stack-large stack-exception">
          {taskList}
        </ul>
        </div>
    </div>
  );
}

export default App;
