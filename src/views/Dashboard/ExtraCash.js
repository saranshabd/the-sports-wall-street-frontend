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
import { useHistory } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
  useToast,
} from "@chakra-ui/react";

// Styles for the circular progressbar
import "react-circular-progressbar/dist/styles.css";
import medusa from "assets/img/background-body-admin.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import * as GradientProgress from "@delowar/react-circle-progressbar";
import Loader from "components/Loader";

// Icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import Prizes from "components/Prizes";
import { BsArrowRight } from "react-icons/bs";
import {
  IoCheckmarkDoneCircleSharp,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { BiHappy } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

// Data
import {
  barChartDataDashboard,
  barChartOptionsDashboard,
  lineChartDataDashboard,
  lineChartOptionsDashboard,
} from "variables/charts";
import { dashboardTableData, timelineData } from "variables/general";

// query
import { useLeagueStandings } from "query/leagueStandings";
import { useUpcomingMatches } from "query/matches";
import { useUser } from "query/user";
import { usePortfolio } from "query/portfolio";

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
