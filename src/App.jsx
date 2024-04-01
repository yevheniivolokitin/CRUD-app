import { useEffect, useState } from "react";
import React from "react";
import { getTodos, deleteTodo, updateTodos, addTodo } from "./api/todo";
import normilizeTodos from "./utils/normilize-todos";
import Todo from "./components/Todo";
import uuid from "react-uuid";

function App() {
   const [todosIds, setTodosIds] = useState(null);
   const [todosByIds, setTodosByIds] = useState({});
   const [isLoadingTodos, setLoadingTodos] = useState(false);
   const [isError, setIsError] = useState(false);
   const [todoTitle, setTodoTitle] = useState("");

   useEffect(() => {
      setIsError(false);
      setLoadingTodos(true);
      getTodos()
         .then((todos) => {
            const [ids, byIds] = normilizeTodos(todos);
            setLoadingTodos(false);
            setTodosIds(ids);
            setTodosByIds(byIds);
         })
         .catch((todos) => {
            setIsError(true);
            setLoadingTodos(false);
         });
   }, []);
   function handleDeleteTodo(id) {
      console.log(id);
      setTodosIds(todosIds.filter((todosIds) => todosIds !== id));
      deleteTodo(id);
   }
   function handleToggle(id) {
      setTodosByIds({
         ...todosByIds,
         [id]: {
            ...todosByIds[id],
            completed: !todosByIds[id].completed,
         },
      });
      updateTodos(id, todosByIds);
      console.log(`Update: ${todosByIds[id].title}`);
   }
   function handleTodoTitleChange(event) {
      setTodoTitle(event.target.value);
   }
   function handleAddTodoBtnClick() {
      const id = uuid();
      const todo = {
         title: todoTitle,
         completed: false,
         id,
      };
      setTodosByIds({ ...todosByIds, [todo.id]: todo });
      setTodosIds([todo.id, ...todosIds]);
      addTodo(todo);
   }
   return (
      <div>
         {isError && <p>Have are problem in server</p>}
         {isLoadingTodos && <p>Download all todos list</p>}
         <h1>Todos list</h1>
         <input
            type="text"
            value={todoTitle}
            onChange={(event) => handleTodoTitleChange(event)}
         />
         <button onClick={handleAddTodoBtnClick}>Add new todo</button>
         {todosIds &&
            todosIds.map((id) => (
               <Todo
                  todo={todosByIds[id]}
                  onDeleteBtnClick={() => handleDeleteTodo(id)}
                  onToggle={() => handleToggle(id)}
               />
            ))}
      </div>
   );
}

export default App;
