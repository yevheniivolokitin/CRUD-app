export default function normilizeTodos(todosList) {
   const ids = [];
   const byIds = {};
   {
      todosList.map((todo) => {
         ids.push(todo.id);
         byIds[todo.id] = todo;
      });
   }
   return [ids, byIds];
}
