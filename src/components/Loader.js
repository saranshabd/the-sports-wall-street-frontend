import React from "react";
import Lottie from "react-lottie";
import { Flex, Text } from "@chakra-ui/react";

import * as loaderLottie from "lottie/loader.json";

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
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loaderLottie,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={100}
          width={100}
        />
        <Text color="white" fontWeight="bold" fontSize="sm">
          Just a sec...
        </Text>
      </Flex>
    </Flex>
  );
}

export default Loader;
