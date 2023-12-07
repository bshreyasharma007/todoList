"use client"
import React, { useState } from "react"

export default function Todo() {
  interface DefaultTodo {
    id: number
    todo: string
    completed: boolean
  }

  const [todoValueForm, setTodoValueForm] = useState<DefaultTodo[]>([]) // Variable where the list of Todo Action item is present
  const [currentTodo, setCurrentTodo] = useState<string>("") //where new todo will be stored

  const addTodo = () => {
    //Do not allow space as valid todo
    if (currentTodo.trim() !== "") {
      const newTodo: DefaultTodo = {
        id: Date.now(),
        todo: currentTodo,
        completed: false,
      }

      setTodoValueForm([...todoValueForm, newTodo])
      setCurrentTodo("") // Clear the currentTodo after adding it to the array
    } else {
      setCurrentTodo("") // Clear the currentTodo since it's empty string
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo() // Call addTodo when the form is submitted
  }

  const toggleTodo = (id: number) => {
    const updatedTodos = todoValueForm.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodoValueForm(updatedTodos)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todoInput"
          placeholder="Enter a todo item"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        ></input>
        <button type="submit">Add Task</button>
      </form>

      {/* Display the list of todos */}
      <ul>
        {todoValueForm.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.todo}
          </li>
        ))}
      </ul>
    </>
  )
}
