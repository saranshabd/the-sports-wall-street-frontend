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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

// Custom components
import Loader from "components/Loader";

// Queries
import { useUser } from "query/user";
import { isLoading } from "utils/auth";
import { updateUserProfile } from "utils/user";

function Inputs({ givenName, familyName, username, refetchUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editUsername, setEditUsername] = useState(username);
  const [editGivenName, setEditGivenName] = useState(givenName);
  const [editFamilyName, setEditFamilyName] = useState(familyName);

  function onClick() {
    if (
      // username
      !editUsername ||
      "" === editUsername ||
      // givenName
      !editGivenName ||
      "" === editGivenName ||
      // familyName
      !editFamilyName ||
      "" === editFamilyName
    ) {
      setErrorMessage("All fields are required");
      setTimeout(() => setErrorMessage(""), 5000); // 5 seconds
      return;
    }
    setIsLoading(true);
    updateUserProfile(editUsername, editGivenName, editFamilyName)
      .then(refetchUser)
      .catch((err) => {
        const errorMessage = err.response.data.errors[0];
        setErrorMessage(errorMessage);
        setTimeout(() => setErrorMessage(""), 5000); // 5 seconds
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {"" !== errorMessage && (
        <Alert status="error" rounded={"2xl"} mb={5}>
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }}>
        <Box>
          <Text color="#E9EDF7" fontWeight={"bold"} fontSize="md">
            Given name
          </Text>
          <Input
            value={editGivenName}
            onChange={(e) => setEditGivenName(e.target.value)}
            mt={1}
            mb={4}
            w="100%"
            maxW="30rem"
            color="white"
            size="lg"
          />
        </Box>
        <Box>
          <Text color="#E9EDF7" fontWeight={"bold"} fontSize="md">
            Family name
          </Text>
          <Input
            value={editFamilyName}
            onChange={(e) => setEditFamilyName(e.target.value)}
            mt={1}
            mb={4}
            w="100%"
            maxW="30rem"
            color="white"
            size="lg"
          />
        </Box>
        <Box>
          <Text color="#E9EDF7" fontWeight={"bold"} fontSize="md">
            Username
          </Text>
          <Input
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            mt={1}
            mb={4}
            w="100%"
            maxW="30rem"
            color="white"
            size="lg"
          />
        </Box>
      </Grid>
      <br />
      <Button isLoading={isLoading} onClick={onClick}>
        Save
      </Button>
    </>
  );
}

function Settings() {
  const history = useHistory();

  // Update the title of the page
  useEffect(() => {
    document.title = "Sports Wall St. | Settings";
  }, []);

  const userResp = useUser();

  if (isLoading(userResp)) {
    return <Loader />;
  }

  if (!!userResp.error) {
    window.gtag("event", "false_auth_error"); // Google Analytics
    history.push("/");
    history.go(0); // reloads the page
  }

  const { data: user, refetch: refetchUser } = userResp;

  return (
    <Flex direction="column" pt={{ base: "0px", md: "0px" }} mx="auto">
      <Text color="#fff" fontWeight="bold" fontSize="3xl">
        Update Profile
      </Text>
      <br />
      <Inputs
        givenName={user.givenName}
        familyName={user.familyName}
        username={user.username}
        refetchUser={refetchUser}
      />
    </Flex>
  );
}

export default Settings;
