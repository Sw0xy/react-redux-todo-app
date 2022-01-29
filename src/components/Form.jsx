import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
function Form() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };
 
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading ? <span style={{ paddingRight: 20 }}>Loading...</span> : ""}
      {error ? <span style={{ paddingRight: 20 }}>Error! {error.message}</span> : ""}
    </form>
  );
}

export default Form;
