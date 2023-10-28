import { Text, Flex } from "@chakra-ui/react";
import { Task, TodoAction } from "@/pages/index";
import TaskCard from "./TaskCard";
import { AddTask } from "./AddTask";
import { Dispatch } from "react";

export default function TodoList(props: {
  username: string;
  tasks: Task[];
  todoDispatch: Dispatch<TodoAction>;
}) {
  function addTask(task: Task) {
    props.todoDispatch({ type: "CREATE_TODO", task });
  }

  function completeTask(id: string) {
    props.todoDispatch({ type: "TOGGLE_TODO", taskId: id });
  }

  function uncompleteTask(id: string) {
    props.todoDispatch({ type: "TOGGLE_TODO", taskId: id });
  }

  function deleteTask(id: string) {
    props.todoDispatch({ type: "DELETE_TODO", taskId: id });
  }

  return (
    <>
      <Text fontSize="4xl" textAlign="center" py={3}>
        Hello, {props.username}!
      </Text>
      <AddTask username={props.username} addTask={addTask} />
      <Text fontSize="2xl" textAlign="center">
        Here are your todos:
      </Text>
      <Flex direction="column" alignItems="center" width="100%">
        {props.tasks.filter((task: Task) => !task.completed).length === 0 && (
          <Text fontSize="xl" textAlign="center" p={3}>
            Nothing here yet!
          </Text>
        )}
        {props.tasks
          .filter((task: Task) => !task.completed)
          .map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              completeTask={completeTask}
              uncompleteTask={uncompleteTask}
              deleteTask={deleteTask}
            />
          ))}
      </Flex>
      <Text fontSize="2xl" textAlign="center">
        Completed Tasks:
      </Text>
      <Flex direction="column" alignItems="center" width="100%">
        {props.tasks.filter((task: Task) => task.completed).length === 0 && (
          <Text fontSize="xl" textAlign="center" p={3}>
            Nothing here yet!
          </Text>
        )}
        {props.tasks
          .filter((task: Task) => task.completed)
          .map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              completeTask={completeTask}
              uncompleteTask={uncompleteTask}
              deleteTask={deleteTask}
            />
          ))}
      </Flex>
    </>
  );
}