import { useState } from "react";
import { Box } from "./Box";
import { Button, Flex } from "@chakra-ui/react";

export function Counter(props: { numBoxes: number }) {
  let [globalCount, setGlobalCount] = useState<number>(0);

  function incrementGlobalCount() {
    setGlobalCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <h2>Total Clicks: {globalCount}</h2>
      <h3>Sum of all counters is {globalCount}</h3>
      <Flex>
        {Array.from(Array(props.numBoxes)).map((box: number) => (
          <Box incrementGlobalCount={incrementGlobalCount} />
        ))}
      </Flex>
    </div>
  );
}
