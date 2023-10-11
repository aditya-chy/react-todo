import { Stack, Text, Textarea, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "@/pages";

export function AddTask(props: { username: string; addTask: Function }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateCreated, setDateCreated] = useState<Date>(new Date());
  const [author, setAuthor] = useState<string>(props.username);

  return (
    <Stack
      spacing={4}
      w={"full"}
      maxW={"lg"}
      bg="white"
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
      my={8}
      mx="auto"
    >
      <Text fontSize="2xl" textAlign="center">
        Add a todo:
      </Text>
      <Input
        placeholder="Task Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        _placeholder={{ color: "gray.500" }}
      />
      <Textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Text fontSize="lg" textAlign="center">
        Date Created: {dateCreated.toLocaleDateString()}
      </Text>
      <Text fontSize="lg" textAlign="center">
        Author: {author}
      </Text>
      <Button
        isDisabled={title == ""}
        onClick={() => {
          props.addTask(new Task(title, description, author, dateCreated));
          setTitle("");
          setDescription("");
        }}
        colorScheme="blue"
      >
        Create Task
      </Button>
    </Stack>
  );
}
