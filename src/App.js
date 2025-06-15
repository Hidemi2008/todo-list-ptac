import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);   // lista de tarefas
  const [text, setText] = useState("");     // texto do input

  function addTask() {
    if (text.trim() === "") return;         // evita tarefa vazia
    setTasks([...tasks, text.trim()]);      // adiciona no array
    setText("");                            // limpa input
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));  // remove tarefa
  }

  return (
    <div>
      <h1>Todo List</h1>

      <input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Digite sua tarefa"
      />
      <button onClick={addTask}>Adicionar</button>

      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task} <button onClick={() => removeTask(i)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
