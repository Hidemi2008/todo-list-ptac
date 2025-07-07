import React, { useState, useEffect } from "react";

import "./App.css"

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (text.trim() === "") return;
    setTasks([...tasks, { text: text.trim(), completed: false }]);
    setText("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditText("");
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editText.trim() === "") return;
    const updated = [...tasks];
    updated[index].text = editText.trim();
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="todo-container">
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua tarefa"
      />
      <button className="todo-button" onClick={addTask}>Adicionar</button>

      <ul className="todo-list">
        {tasks.map((task, i) => (
          <li key={i} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(i)}
            />
            {editIndex === i ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="todo-button" onClick={() => saveEdit(i)}>Salvar</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button className="todo-button" onClick={() => startEdit(i)}>Editar</button>
              </>
            )}
            <button className="todo-remove" onClick={() => removeTask(i)}>Remover</button>
          </li>
        ))}
      </ul>

      <p>✅ Concluídas: {completedCount} | ⏳ Pendentes: {pendingCount}</p>
    </div>
  );
}

export default TodoList;
