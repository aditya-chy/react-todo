import React, { useState, useReducer, useRef, useContext, useEffect } from "react";
import Login from "@/Components/Login";
import TodoList from "@/Components/TodoList";
import { Text, Divider, Flex, Button } from "@chakra-ui/react";
import { StateContext } from "@/Context/StateContext";
import { useAxios } from "@/Context/AxiosContext";
import { jwtDecode } from "jwt-decode";

export class Task {
  _id: string;
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
    this._id = "",
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
    const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const { username } = decodedToken;
      userDispatch({ type: "LOGIN", username, password: "" });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  }, []);

  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    axiosInstance("/api/tasks").then((todos: { data: Task[] }) => {
      todoDispatch({ type: "DELETE_TODO", taskId: "all" });
      for (let todo of todos.data)
        todoDispatch({ type: "CREATE_TODO", task: todo });
    }).catch(() => {
      // userDispatch({ type: "LOGOUT" });
    });
  }, []);

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
              localStorage.setItem("token", "");
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
