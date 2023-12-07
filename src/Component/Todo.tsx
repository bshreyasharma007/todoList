"use client"
import React, { useState } from "react"
import styles from "./Todo.module.css"

export default function Todo() {
  interface DefaultTodo {
    id: number
    todo: string
    completed: boolean
  }

  const [todoValueForm, setTodoValueForm] = useState<DefaultTodo[]>([]) // Variable where the list of Todo Action items is present
  const [currentTodo, setCurrentTodo] = useState<string>("") // Where new todo will be stored
  const [completedList, setCompletedList] = useState<DefaultTodo[]>([]) // Variable where the list of completed Todo items is present

  const addTodo = () => {
    // Do not allow space as a valid todo
    if (currentTodo.trim() !== "") {
      const newTodo: DefaultTodo = {
        id: Date.now(),
        todo: currentTodo,
        completed: false,
      }

      setTodoValueForm([...todoValueForm, newTodo])
      setCurrentTodo("") // Clear the currentTodo after adding it to the array
    } else {
      setCurrentTodo("") // Clear the currentTodo since it's an empty string
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
    const completedTodo = todoValueForm.find((todo) => todo.id === id)

    setTodoValueForm(updatedTodos)

    if (completedTodo && completedTodo.completed) {
      setCompletedList([...completedList, completedTodo])
    } else {
      setCompletedList(completedList.filter((todo) => todo.id !== id))
    }
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

      {/* Display the list of todos with completed: false */}
      <h5>Todo</h5>
      <ul className={styles.todoList}>
        {todoValueForm
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id} className={styles.todo}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.todo}
            </li>
          ))}
      </ul>

      {/* Display the list of completed todos */}
      <h5>Completed</h5>
      <ul className={styles.todoList}>
        {todoValueForm
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li key={todo.id} className={styles.completed}>
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
