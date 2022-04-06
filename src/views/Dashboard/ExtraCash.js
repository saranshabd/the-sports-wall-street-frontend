/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";

// Chakra imports
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";

// Styles for the circular progressbar
import "react-circular-progressbar/dist/styles.css";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Loader from "components/Loader";

// query
import { useUser } from "query/user";

export default function ExtraCash() {
  const userResp = useUser();
  const chakraToast = useToast();

  // Update the title of the page
  useEffect(() => {
    document.title = "Sports Wall St. | Extra Cash";
  }, []);

  if (userResp.isFetching) {
    return <Loader />;
  }

  if (!!userResp.error) {
    window.gtag("event", "false_auth_error"); // Google Analytics
    history.push("/");
    history.go(0); // reloads the page
  }

  const user = userResp.data;

  function copyInviteLinkOnClick() {
    const pathname = `/auth/signin?referredBy=${user._id}`;
    const url = `${window.location.protocol}//${window.location.host}${pathname}`;
    navigator.clipboard.writeText(url);
    chakraToast({
      title: "Start sharing!",
      description: "Invite link copied to clipboard",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <Flex flexDirection="column" pt={{ base: "0px", md: "0px" }}>
      <Card>
        <CardHeader>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            w="100%"
            align={"center"}
          >
            ✨ Refer a Friend ✨
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column" w="100%">
            <Text color="white" w="100%" align={"center"} mt={4}>
              Bring a friend along and we will award you with an extra{" "}
              <Text as="span" fontSize="lg" fontWeight="bold">
                €10,000
              </Text>{" "}
              cash.
            </Text>
            <Text color="white" w="100%" align={"center"} mt={1}>
              Fair enough?
            </Text>
            <Box w="100%" align="center">
              <Button
                onClick={copyInviteLinkOnClick}
                w="20rem"
                maxW="100%"
                mt={6}
              >
                Copy Invite Link
              </Button>
            </Box>
            <Text color="white" w="100%" align={"center"} mt={4}>
              You will be rewarded when your friend makes the first trade.
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
