import { useAxios } from "@/Context/AxiosContext";
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
  useToast,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";

export default function Login(props: { userDispatch: Dispatch<UserAction> }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const axiosInstance = useAxios();
  const toast = useToast();

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
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Your Username"
            _placeholder={{ color: "gray.500" }}
            onChange={(e: any) => setUsername(e.target.value)}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Your Password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            onClick={async () => {
              try {
                await axiosInstance.post("/api/register", {
                  username,
                  password,
                });
                // If registration succeeds, proceed with login
                const loginResponse = await axiosInstance.post("/api/login", {
                  username,
                  password,
                });
                const { token } = loginResponse.data;
                localStorage.setItem("token", token); // Save token in localStorage
                props.userDispatch({ type: "LOGIN", username, password }); // Dispatch login action
                toast({
                  title: "Succesfully Logged In",
                  status: "success",
                });
              } catch (error) {
                console.error("Authentication failed:", error);
                toast({
                  title: "Error Logging In",
                  status: "error",
                });
              }
            }}
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
