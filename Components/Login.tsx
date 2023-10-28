import { UserAction, UserState } from "@/pages";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";

export default function Login(props: {
  userDispatch: Dispatch<UserAction>;
}) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Login/Register
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Your Username"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            onClick={() => props.userDispatch({ type: 'LOGIN', username, password })}
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
