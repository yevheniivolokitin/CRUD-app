const BASE_URL = "https://jsonplaceholder.typicode.com";
export async function getTodos() {
   const response = await fetch(`${BASE_URL}/todos`);
   if (!response.ok) {
      throw new Error("Api response fail");
   }
   return await response.json();
}

export function deleteTodo(id) {
   return fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
}
export function updateTodos(id, todo) {
   return fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
         id: id,
         title: todo.title,
         completed: todo.completed,
      }),
   });
}
export async function addTodo(todo) {
   const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-type": "application/json;charset=UTF-8" },
   });
   if (!response.ok) {
      throw new Error("Api response fail");
   }
   return await response.json();
}
