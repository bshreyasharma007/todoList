"use client"
import React, { useState } from "react"
import styles from "./Todo.module.css"

export default function Todo() {
  interface DefaultTodo {
    id: number
    todo: string
    completed: boolean
  }

  const [todoList, setTodoList] = useState<DefaultTodo[]>([]) // Variable where the list of Todo Action items is present
  const [currentTodo, setCurrentTodo] = useState<string>("") // Where new todo will be stored

  const addTodo = () => {
    // Do not allow space as a valid todo
    if (currentTodo.trim() !== "") {
      const newTodo: DefaultTodo = {
        id: Date.now(),
        todo: currentTodo,
        completed: false,
      }

      setTodoList([...todoList, newTodo])
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
    const updatedTodos = todoList.map((todo) => {
      // If the todo's id matches the provided id, toggle its completed status
      if (todo.id === id) {
        // Find the completed todo with the provided id
        const completedTodo = todoList.find((t) => t.id === id)

        // Log the completed todo
        console.log("Completed Todo:", completedTodo)

        return { ...todo, completed: !todo.completed }
      } else {
        return todo
      }
    })

    // Update the todoList with the new array of updated todos
    setTodoList(updatedTodos)
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
        {todoList
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
        {todoList
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
