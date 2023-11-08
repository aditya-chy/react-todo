import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export function Box(props: { incrementGlobalCount: () => void }) {
  let [currentCount, setCurrentCount] = useState<number>(0);

  function handleClick() {
    setCurrentCount((prevCount) => prevCount + 1);
    props.incrementGlobalCount();
  }

  return (
    <Flex direction="column" width={50} align="center">
      {currentCount}
      <Button onClick={handleClick} margin={3}>
        <b>+</b>
      </Button>
    </Flex>
  );
}
