import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter ,clearCompleted ,selectTodos } from "../redux/todos/todosSlice";
function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);

  const itemsLeft = items.filter((item) => !item.completed).length;
  const activeFilters = useSelector((state) => state.todos.activeFilters);
  useEffect(() => {
   localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
  }, [activeFilters]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilters === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilters === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilters === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={() => dispatch(clearCompleted(items))}>Clear completed</button>
    </footer>
  );
}

export default ContentFooter;
