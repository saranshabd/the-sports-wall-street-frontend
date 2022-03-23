import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <Flex
      flexDirection="row"
      align="center"
      justify="center"
      w="100%"
      pt="10rem"
    >
      <Flex flexDirection="column" align="center" justify="center" gap="5px">
        <Spinner color="white" size="lg" />
        <Text color="white" fontWeight="bold" fontSize="sm">
          Hold on a sec
        </Text>
      </Flex>
    </Flex>
  );
}

export default Loader;
