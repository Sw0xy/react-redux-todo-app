import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo , removeTodo ,selectTodos ,selectFilteredTodos} from "../redux/todos/todosSlice";
function TodoList() {
  const dispatch = useDispatch(selectTodos);
  const items = useSelector(selectFilteredTodos);
  return (
    <ul className="todo-list">
      
      {items.map((item, index) => {
        return (
          <li key={index} className={item.completed ? "completed" : "view"}>
            <div className="view">
              <input className="toggle" type="checkbox" checked={item.completed} onChange={() => dispatch(toggleTodo({ id: item.id }))} />
              <label>{item.title}</label>
              <button className="destroy" onClick={() => dispatch(removeTodo({ id: item.id }))}></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
