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

import { useHistory } from "react-router-dom";

// Chakra imports
import {
  ChakraProvider,
  Portal,
  useDisclosure,
  Text,
  Box,
  Heading,
  Container,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import theme from "theme/themeAdmin.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";

const Feature = ({ title, text }) => {
  return (
    <Stack>
      <Text fontSize="lg" color="green.100" fontWeight={600}>
        {title}
      </Text>
      <Text color="white">{text}</Text>
    </Stack>
  );
};

export default function Home() {
  const history = useHistory();

  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <MainPanel w={{ base: "100%" }}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 36 }}
          px={{ base: "5rem", md: "5rem", sm: "1rem" }}
          mt="2rem"
        >
          <Heading
            fontWeight={900}
            fontSize={{ base: "2xl", sm: "4xl", md: "8xl" }}
            lineHeight={"110%"}
            color="white"
            fontFamily={"revert"}
          >
            Football stocks. <br />
            <Text as={"span"} color="white">
              It's that simple.
            </Text>
          </Heading>
          <Text color="white" fontSize={{ base: "md", md: "xl" }}>
            Football is a team sport - Leave Fantasy to loners and tennis fans.{" "}
            <Box color="green.100" mt="5px" fontWeight="bold">
              You support clubs, not individual players.
            </Box>
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            pt="5rem"
          >
            <Button
              colorScheme={"telegram"}
              px={20}
              onClick={() => history.push("/auth")}
            >
              Get started
            </Button>
          </Stack>
          <Box p={4} pt="5rem">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                title={"Believe Arsenal will finish in top 4?"}
                text={
                  "From relegation stuggles to a potential top-4 finish, Arsenal's initial investors are very happy right now."
                }
              />
              <Feature
                title={"Think City will win the title?"}
                text={
                  "If City wins, their stock price will sky rocket so buy all the City stocks you can."
                }
              />
              <Feature
                title={"Feel City will eventually bottle?"}
                text={
                  "Liverpool is coming back at City. Their stock price currently is more expensive than City's."
                }
              />
            </SimpleGrid>
          </Box>
          <Heading
            fontWeight={900}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color="white"
            fontFamily={"revert"}
            pt="5rem"
          >
            Spot the dip. Invest. <br />
            <Text
              as={"span"}
              color="green.100"
              fontSize={{ base: "2xl", sm: "xl" }}
            >
              Show how well you know the sport?
            </Text>
          </Heading>
          <Box>
            <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
              <Stack spacing={0} align={"center"}>
                <Heading color="white" fontFamily="revert">
                  Play in your own style
                </Heading>
                <Text color="white" fontFamily="revert">
                  Become a professional Wall Street trader with real-world
                  market simulations
                </Text>
              </Stack>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 10, md: 4, lg: 10 }}
              >
                <Testimonial>
                  <TestimonialContent>
                    <TestimonialHeading>Hardcore supporter</TestimonialHeading>
                    <TestimonialText>
                      I had invested in Arsenal from the beginning of the
                      season, and I have suffered a lot. But now feels proud to
                      be a Gunner!
                    </TestimonialText>
                  </TestimonialContent>
                  <TestimonialAvatar name={"Harsh"} />
                </Testimonial>
                <Testimonial>
                  <TestimonialContent>
                    <TestimonialHeading>Underdogs</TestimonialHeading>
                    <TestimonialText>
                      Invests in West Ham, Wolves and Leeds. Loses are minor
                      because they are expected but wins produce massive
                      returns.
                    </TestimonialText>
                  </TestimonialContent>
                  <TestimonialAvatar name={"Shikhar"} />
                </Testimonial>
                <Testimonial>
                  <TestimonialContent>
                    <TestimonialHeading>Follow the wind</TestimonialHeading>
                    <TestimonialText>
                      I invest in clubs that are in form at the moment, which
                      doesn't give huge returns but my portfolio always stays
                      green.
                    </TestimonialText>
                  </TestimonialContent>
                  <TestimonialAvatar name={"Vedant"} />
                </Testimonial>
              </Stack>
            </Container>
          </Box>
          <Flex flexDirection={"column"} gap={8}>
            <Text color="white" fontSize="lg" fontFamily="revert">
              Start with (fake){" "}
              <Text as="span" fontSize="xl" fontWeight="bold" color="green.100">
                €100,000
              </Text>{" "}
              in the account, and show off your trading skills.
            </Text>
            <Text color="white" fontSize="lg" fontFamily="revert">
              Stock price of the League winning team will boost up by{" "}
              <Text as="span" fontSize="xl" fontWeight="bold" color="green.100">
                40-50%
              </Text>{" "}
              at the end of the season.
            </Text>
            <Text color="white" fontSize="lg" fontFamily="revert">
              Stock price of the teams finishing in Top 4 will boost up by{" "}
              <Text as="span" fontSize="xl" fontWeight="bold" color="green.100">
                20-30%
              </Text>{" "}
              at the end of the season.
            </Text>
            <Text color="white" fontSize="lg" fontFamily="revert">
              You cannot buy/sell team stocks while they are playing a game.
            </Text>
          </Flex>
        </Stack>
        <Footer />
      </MainPanel>
    </ChakraProvider>
  );
}

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"} fontFamily="revert">
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
      fontFamily="revert"
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600} color="white">
          {name}
        </Text>
      </Stack>
    </Flex>
  );
};

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
