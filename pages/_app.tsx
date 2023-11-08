import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { StateContextProvider } from "../Context/StateContext";
import { AxiosProvider } from "../Context/AxiosContext";

import Axios from 'axios';

export const axiosInstance = Axios.create({
  baseURL: 'http://localhost:3000',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StateContextProvider>
        <AxiosProvider>
          <Component {...pageProps} />
        </AxiosProvider>
      </StateContextProvider>
    </ChakraProvider>
  );
}