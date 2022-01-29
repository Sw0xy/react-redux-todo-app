import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return response.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (todo) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, todo);
    return response.data;
  }
);
export const toggleTodoAsync = createAsyncThunk(
    "todos/toggleTodoAsync",
    async ({ id , data}) => {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
        return response.data;
    }
);
export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async ({ id }) => {
        await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
        return id;
    }
);
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    addNewTodoIsLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    toggleAll: (state, action) => {
      state.items.forEach(
        (todo) => (todo.completed = action.payload.completed)
      );
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
    changeActiveFilter: (state, action) => {
      state.activeFilters = action.payload;
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },

    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.items = [];
      state.error = action.error.message;
    },
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoIsLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoIsLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
        state.addNewTodoIsLoading = false;
        state.error = action.error.message;

    },
    [toggleTodoAsync.pending]: (state, action) => {
        state.isLoading = true;
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {

        const { id, completed } = action.payload;

        const todoIndex = state.items.findIndex(
            (todo) => todo.id === id
        );
        state.items[todoIndex].completed = completed;
        state.isLoading = false;
    },
    [toggleTodoAsync.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
    },
    [deleteTodoAsync.pending]: (state, action) => {
        state.isLoading = true;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {

        const todoIndex = state.items.findIndex(
            (todo) => todo.id === action.payload
        );
        state.items.splice(todoIndex, 1);
        state.isLoading = false;
    },
    [deleteTodoAsync.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
    }





  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  const activeFilter = state.todos.activeFilters;
  const todos = state.todos.items;
  switch (activeFilter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const {
  toggleTodo,
  removeTodo,
  toggleAll,
  changeActiveFilter,
  clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;
