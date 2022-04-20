// Chakra imports
import {
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  Image,
  Link,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

function Prizes({ maxWidth }) {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      rounded={"2xl"}
      bgImage="https://ak.picdn.net/shutterstock/videos/23781511/thumb/1.jpg"
      bgPos="center"
      bgSize={"cover"}
      maxWidth={maxWidth}
    >
      {/* <AlertIcon boxSize="40px" mr={0} /> */}
      <AlertTitle mb={1} fontSize="xl">
        ✨ Prizes ✨
      </AlertTitle>
      <Image
        height="20"
        src="https://cdn-icons-png.flaticon.com/512/1999/1999016.png"
      />
      {/* <img src="https://cdn-icons-png.flaticon.com/512/1999/1999016.png" /> */}
      <AlertDescription maxWidth="lg" mb={1}>
        <Text as="span" fontWeight="bold">
          👑 Top 3
        </Text>{" "}
        - Favorite Club's Jersey
        <br />
        <Text as="span" fontWeight="bold">
          ⚔️ Rest Top 10
        </Text>{" "}
        - Favorite Club's Goodies
        <br />
        <Text as="span" fontWeight="bold">
          <Link
            target="_blank"
            href="https://twitter.com/TheSportsWallSt/status/1515986687372906499"
            textDecoration="underline"
            color="blue.500"
          >
            <InfoIcon color="blue.500" /> Lucky 3
          </Link>
        </Text>{" "}
        - NMFC Official Football
      </AlertDescription>
    </Alert>
  );
}

export default Prizes;
