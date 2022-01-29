import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: 1,
                title: 'Learn about React',
                completed: false

            },
            {
                id: 2,
                title: 'Meet friend for lunch',
                completed: true
            },
        ],
    },
    activeFilters: 'all',
    reducers: {
        addTodo: (state, action) => {
            const newItem = {
                id: action.payload.id,
                title: action.payload.title,
                completed: false
            };
            state.items.push(newItem);
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload.id);
            todo.completed = !todo.completed;
        },
        removeTodo: (state, action) => {
            const todoIndex = state.items.findIndex(todo => todo.id === action.payload.id);
            state.items.splice(todoIndex, 1);
        },
        editTodo: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload.id);
            todo.title = action.payload.title;
        },
        toggleAll: (state, action) => {
            state.items.forEach(todo => todo.completed = action.payload.completed);
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(todo => !todo.completed);
        },
        changeActiveFilter: (state, action) => {
            state.activeFilters = action.payload;
        }
        

        
    },
}); 

export const selectTodos = state => state.todos.items;
export const selectFilteredTodos = state => {
    const activeFilter = state.todos.activeFilters;
    const todos = state.todos.items;
    switch (activeFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
};

export const { addTodo, toggleTodo, removeTodo, editTodo, toggleAll,changeActiveFilter, clearCompleted  } = todosSlice.actions;
export default todosSlice.reducer;