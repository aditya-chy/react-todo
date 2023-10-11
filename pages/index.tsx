import Login from "@/Components/Login";
import TodoList from "@/Components/TodoList";
import { Text, Divider, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";

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

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <Text fontSize="5xl" textAlign="center">
        Todo List
      </Text>
      <Divider borderWidth="2px" />
      <Flex justifyContent="center">
        {loggedIn && (
          <Button
            onClick={() => {
              setLoggedIn(false);
              setUsername("");
              setPassword("");
              setTasks([]);
            }}
            variant="ghost"
          >
            Logout
          </Button>
        )}
      </Flex>
      {!loggedIn ? (
        <Login
          setUsername={setUsername}
          setPassword={setPassword}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <TodoList username={username} tasks={tasks} setTasks={setTasks} />
      )}
    </>
  );
}
