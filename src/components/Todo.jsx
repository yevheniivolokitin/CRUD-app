export default function Todo({ todo, onDeleteBtnClick, onToggle }) {
   return (
      <div key={todo.id}>
         <p>
            {todo.title}
            <input
               type="checkbox"
               checked={todo.completed}
               onChange={onToggle}
            />
            <button onClick={onDeleteBtnClick}>Delete todos</button>
         </p>
      </div>
   );
}
