import React, { useState, useReducer, useContext, useEffect } from "react";
import Login from "@/Components/Login";
import TodoList from "@/Components/TodoList";
import { Text, Divider, Flex, Button } from "@chakra-ui/react";
import { StateContext } from "@/Context/StateContext";
import { useAxios } from "@/Context/AxiosContext";

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

export type UserAction =
  | { type: "LOGIN"; username: string; password: string }
  | { type: "LOGOUT" };

export interface TodoState {
  tasks: Task[];
}

export type TodoAction =
  | { type: "CREATE_TODO"; task: Task }
  | { type: "TOGGLE_TODO"; taskId: string }
  | { type: "DELETE_TODO"; taskId: string };

export default function Home() {
  const { userState, userDispatch, todoState, todoDispatch } = useContext(
    StateContext
  ) as any;
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance("/api/tasks").then((todos: { data: Task[] }) => {
      for (let todo of todos.data)
        if (todo.author == userState.username) {
          todoDispatch({ type: "CREATE_TODO", task: todo });
        }
    });
  }, [userState]);

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
              userDispatch({ type: "LOGOUT" });
              todoDispatch({ type: "DELETE_TODO", taskId: "all" });
            }}
            variant="ghost"
          >
            Logout
          </Button>
        )}
      </Flex>
      {!userState.loggedIn ? (
        <Login userDispatch={userDispatch} />
      ) : (
        <TodoList
          username={userState.username}
          tasks={todoState.tasks}
          todoDispatch={todoDispatch}
        />
      )}
    </>
  );
}
