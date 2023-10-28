import React, { useState, useReducer } from 'react';
import Login from '@/Components/Login';
import TodoList from '@/Components/TodoList';
import { Text, Divider, Flex, Button } from '@chakra-ui/react';

export class Task {
  id: string;
  title: string;
  description: string;
  author: string;
  dateCreated: Date;
  completed: boolean;
  dateCompleted?: Date;

  constructor(
    title: string,
    description: string,
    author: string,
    dateCreated: Date
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.description = description;
    this.author = author;
    this.dateCreated = dateCreated;
    this.completed = false;
  }
}

export interface UserState {
  username: string;
  password: string;
  loggedIn: boolean;
}

export type UserAction = { type: 'LOGIN', username: string, password: string } | { type: 'LOGOUT' };

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
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

export interface TodoState {
  tasks: Task[];
}

export type TodoAction =
  | { type: 'CREATE_TODO'; task: Task }
  | { type: 'TOGGLE_TODO'; taskId: string }
  | { type: 'DELETE_TODO'; taskId: string };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
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
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };
    default:
      return state;
  }
}

export default function Home() {
  const [userState, userDispatch] = useReducer(userReducer, { username: "", password: "", loggedIn: false });
  const [todoState, todoDispatch] = useReducer(todoReducer, { tasks: [] });

  return (
    <>
      <Text fontSize="5xl" textAlign="center">
        Todo List
      </Text>
      <Divider borderWidth="2px" />
      <Flex justifyContent="center">
        {userState.loggedIn && (
          <Button
            onClick={() => {
              userDispatch({ type: 'LOGOUT' });
              todoDispatch({ type: 'DELETE_TODO', taskId: 'all' });
            }}
            variant="ghost"
          >
            Logout
          </Button>
        )}
      </Flex>
      {!userState.loggedIn ? (
        <Login
          userDispatch={userDispatch}
        />
      ) : (
        <TodoList username={userState.username} tasks={todoState.tasks} todoDispatch={todoDispatch} />
      )}
    </>
  );
}