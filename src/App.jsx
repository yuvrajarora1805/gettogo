import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100

  return (
    <motion.div
      className="todo-app"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="app-header">
        <h1 className="app-title">✨ Todo List ✨</h1>
        <ProgressBar progress={progress} />
      </div>
      <TodoForm onSubmit={addTodo} />
      <AnimatePresence mode="popLayout">
        {todos.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="emoji">📝</span>
            No todos yet! Add some tasks to get started.
          </motion.div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
