import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  selectTodos,
  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
  deleteTodoAsync
} from "../redux/todos/todosSlice";
function TodoList() {
  const dispatch = useDispatch(selectTodos);
  const items = useSelector(selectFilteredTodos);

  const isLoading = useSelector((state) => state.todos.isLoading);

  const error = useSelector((state) => state.todos.error);
  const handleToggle = async (id,completed) => {
    await dispatch(toggleTodoAsync({ id ,data: {completed}}));
  };
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <ul className="todo-list">
      {items.map((item, index) => {
        return (
          <li key={index} className={item.completed ? "completed" : "view"}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle(item.id, !item.completed)}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => dispatch(deleteTodoAsync({ id: item.id }))}
              ></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
