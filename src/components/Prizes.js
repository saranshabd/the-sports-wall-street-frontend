// Chakra imports
import {
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  Image,
} from "@chakra-ui/react";

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
      </AlertDescription>
    </Alert>
  );
}

export default Prizes;
