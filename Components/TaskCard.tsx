"use client";

import React from "react";
import { Stack, Text, Checkbox, Flex, Button } from "@chakra-ui/react";
import { Task } from "@/pages";

export default function TaskCard(props: {
  task: Task;
  completeTask: Function;
  uncompleteTask: Function;
  deleteTask: Function;
}) {
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" w="600px">
      <Stack direction="row" alignItems="center">
        <Flex justifyContent={"space-between"} width="100%">
          <Flex>
            <Checkbox
              defaultChecked={props.task.completed}
              onChange={(e) => {
                if (e.target.checked) {
                  props.completeTask(props.task.id);
                } else {
                  props.uncompleteTask(props.task.id);
                }
              }}
              size="lg"
              mx={2}
            />
            <Text fontWeight="semibold" fontSize="3 xl">
              {props.task.title}
            </Text>
            <Text fontWeight="semibold" fontSize="3 xl" mx={2}>
              {props.task.completed ? "✅" : "❌"}
            </Text>
          </Flex>
          <Text fontWeight="semibold" fontSize="3 xl" float="right">
            {props.task.completed ? "Completed" : "Created"} On:{" "}
            {(props.task.completed || !props.task.dateCompleted
              ? props.task.dateCreated
              : props.task.dateCompleted
            ).toLocaleDateString()}
          </Text>
        </Flex>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          {props.task.description}
        </Text>
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          <b>Author</b>: {props.task.author}
        </Text>
      </Stack>
      <Flex justifyContent="right">
        <Button
          colorScheme="red"
          onClick={() =>
            confirm("Are You Sure You want to delete task?") &&
            props.deleteTask(props.task.id)
          }
        >
          Delete
        </Button>
      </Flex>
    </Stack>
  );
}
