import { Text, Flex } from "@chakra-ui/react";
import { Task } from "@/pages/index";
import TaskCard from "./TaskCard";
import { AddTask } from "./AddTask";

export default function TodoList(props: {
  username: string;
  tasks: Task[];
  setTasks: Function;
}) {
  function addTask(task: Task) {
    props.setTasks((tasks: Task[]) => [...tasks, task]);
  }

  function completeTask(id: string) {
    props.setTasks((tasks: Task[]) =>
      tasks.map((task) => {
        if (task.id === id) {
          task.completed = true;
          task.dateCompleted = new Date();
        }
        return task;
      })
    );
  }

  function uncompleteTask(id: string) {
    props.setTasks((tasks: Task[]) =>
      tasks.map((task) => {
        if (task.id === id) {
          task.completed = false;
          task.dateCompleted = undefined;
        }
        return task;
      })
    );
  }

  function deleteTask(id: string) {
    props.setTasks((tasks: Task[]) => tasks.filter((task) => task.id !== id));
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
        {props.tasks.filter((task: Task) => !task.completed).length == 0 && (
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
        {props.tasks.filter((task: Task) => task.completed).length == 0 && (
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
