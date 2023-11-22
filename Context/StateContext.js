import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state and reducer functions for your app state
const initialState = {
  userState: {
    username: '',
    password: '',
    loggedIn: false,
  },
  todoState: {
    tasks: [],
  },
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        password: action.password,
        loggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE_TODO':
      return { tasks: [...state.tasks, action.task] };
    case 'TOGGLE_TODO':
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? {
                ...task,
                completed: !task.completed,
                dateCompleted: task.completed ? undefined : new Date(),
              }
            : task
        ),
      };
    case 'DELETE_TODO':
      return {
        tasks: state.tasks.filter((task) => action.taskId != "all" || task._id !== action.taskId),
      };
    default:
      return state;
  }
}

// Create a context for your app state
export const StateContext = createContext(initialState);

// Wrap your components in the StateContext.Provider and pass the state and dispatch
export function StateContextProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, initialState.userState);
  const [todoState, todoDispatch] = useReducer(todoReducer, initialState.todoState);

  return (
    <StateContext.Provider value={{ userState, userDispatch, todoState, todoDispatch }}>
      {children}
    </StateContext.Provider>
  );
}