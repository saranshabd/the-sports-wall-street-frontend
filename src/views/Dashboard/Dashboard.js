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
import { isLoading } from "utils/auth";

export default function Dashboard() {
  const history = useHistory();

  const userResp = useUser();
  const leagueStandingsResp = useLeagueStandings();
  const upcomingMatchesResp = useUpcomingMatches();

  // Update the title of the page
  useEffect(() => {
    document.title = "Sports Wall St. | Dashboard";
  }, []);

  if (
    isLoading(leagueStandingsResp) ||
    isLoading(upcomingMatchesResp) ||
    isLoading(userResp)
  ) {
    return <Loader />;
  }

  if (
    !!userResp.error ||
    !!leagueStandingsResp.error ||
    !!upcomingMatchesResp.error
  ) {
    window.gtag("event", "false_auth_error"); // Google Analytics
    history.push("/");
    history.go(0); // reloads the page
  }

  const leagueStandings = leagueStandingsResp.data;
  const upcomingMatches = upcomingMatchesResp.data;
  const user = userResp.data;
  const { investments: portfolio } = user.portfolio;

  const maxGamesPlayed = Math.max(
    ...leagueStandings.map((item) => item.playedGames)
  );

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getTotalNetWorth() {
    let totalNetWorth = 0;
    portfolio.forEach((item) => {
      totalNetWorth += item.stocksCount * item.latestStockPrice;
    });
    return totalNetWorth + user.portfolio.cash;
  }

  function getPrevTotalNetWorth() {
    let totalNetWorth = 0;
    portfolio.forEach((item) => {
      totalNetWorth += item.stocksCount * item.buyingPrice;
    });
    return totalNetWorth + user.portfolio.cash;
  }

  function getDiffPerc() {
    const totalNetWorth = getTotalNetWorth();
    const prevTotalNetWorth = getPrevTotalNetWorth();
    const diff = (totalNetWorth - prevTotalNetWorth) / prevTotalNetWorth;
    return Math.round(diff * 100);
  }

  const diffPerc = getDiffPerc();

  return (
    <Flex flexDirection="column" pt={{ base: "0px", md: "0px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
        {/* MiniStatistics Card */}
        <Card>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb="2px"
                >
                  Net worth
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="#fff">
                    €{numberWithCommas(getTotalNetWorth())}
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color={diffPerc < 0 ? "red.400" : "green.400"}
                    fontWeight="bold"
                    ps="3px"
                    ml="5px"
                    fontSize="md"
                  >
                    {diffPerc}%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="brand.200">
                <GlobeIcon h={"24px"} w={"24px"} color="#fff" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        {/* MiniStatistics Card */}
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb="2px"
                >
                  Cash
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="#fff">
                    €{numberWithCommas(user.portfolio.cash)}
                  </StatNumber>
                  {/* <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='green.400'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'>
                    +5%
                  </StatHelpText> */}
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="brand.200">
                <WalletIcon h={"24px"} w={"24px"} color="#fff" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        {/* MiniStatistics Card */}
        {/* <Card>
          <CardBody>
            <Flex flexDirection='row' align='center' justify='center' w='100%'>
              <Stat>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='2px'>
                  New Clients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color='#fff'>
                    +3,020
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='red.500'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'>
                    -14%
                  </StatHelpText>
                </Flex>
              </Stat>
              <Spacer />
              <IconBox as='box' h={"45px"} w={"45px"} bg='brand.200'>
                <DocumentIcon h={"24px"} w={"24px"} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card> */}
        {/* MiniStatistics Card */}
        {/* <Card>
          <CardBody>
            <Flex flexDirection='row' align='center' justify='center' w='100%'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='2px'>
                  Total Sales
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color='#fff' fontWeight='bold'>
                    $173,000
                  </StatNumber>
                  <StatHelpText
                    alignSelf='flex-end'
                    justifySelf='flex-end'
                    m='0px'
                    color='green.400'
                    fontWeight='bold'
                    ps='3px'
                    fontSize='md'>
                    +8%
                  </StatHelpText>
                </Flex>
              </Stat>
              <IconBox as='box' h={"45px"} w={"45px"} bg='brand.200'>
                <CartIcon h={"24px"} w={"24px"} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card> */}
      </SimpleGrid>
      <SimpleGrid
        columns={{ sm: 1, md: 2, xl: 2 }}
        // templateColumns={{
        //   sm: "1fr",
        //   md: "1fr 1fr 1fr",
        //   "2xl": "2fr 1.2fr 1.5fr",
        // }}
        my="26px"
        gap="18px"
      >
        {/* Welcome Card */}
        <Prizes />
        <Card
          p="0px"
          // gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "auto" }}
          bgImage={medusa}
          bgSize="cover"
          bgPosition="50%"
        >
          <CardBody w="100%" h="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%" h="100%">
              <Flex
                flexDirection="column"
                h="100%"
                p="22px"
                minW="60%"
                lineHeight="1.6"
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Welcome back,
                </Text>
                <Text fontSize="28px" color="#fff" fontWeight="bold" mb="18px">
                  {user.name}
                </Text>
                <Text
                  fontSize="md"
                  color="gray.400"
                  fontWeight="normal"
                  mb="auto"
                >
                  Glad to see you again!
                </Text>
                {/* <Spacer />
                <Flex align='center'>
                  <Button
                    p='0px'
                    variant='no-hover'
                    bg='transparent'
                    my={{ sm: "1.5rem", lg: "0px" }}>
                    <Text
                      fontSize='sm'
                      color='#fff'
                      fontWeight='bold'
                      cursor='pointer'
                      transition='all .3s ease'
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}>
                      Tab to record
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w='20px'
                      h='20px'
                      color='#fff'
                      fontSize='2xl'
                      transition='all .3s ease'
                      mx='.3rem'
                      cursor='pointer'
                      pt='4px'
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex> */}
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        {/* Satisfaction Rate
        <Card gridArea={{ md: "2 / 1 / 3 / 2", "2xl": "auto" }}>
          <CardHeader mb='24px'>
            <Flex direction='column'>
              <Text color='#fff' fontSize='lg' fontWeight='bold' mb='4px'>
                Satisfaction Rate
              </Text>
              <Text color='gray.400' fontSize='sm'>
                From all projects
              </Text>
            </Flex>
          </CardHeader>
          <Flex direction='column' justify='center' align='center'>
            <Box zIndex='-1'>
              <GradientProgress
                percent={80}
                viewport
                size={200}
                isGradient
                gradient={{
                  angle: 90,
                  startColor: "rgba(117, 81, 255, 0)",
                  stopColor: "#582CFF",
                }}
                emptyColor='#22234B'>
                <IconBox
                  bg='brand.200'
                  borderRadius='50%'
                  w='48px'
                  h='48px'
                  transform={{
                    sm: "translateY(-60%)",
                    md: "translateY(-30%)",
                  }}>
                  <Icon as={BiHappy} color='#fff' w='30px' h='30px' />
                </IconBox>
              </GradientProgress>
            </Box>
            <Stack
              direction='row'
              spacing={{ sm: "42px", md: "68px" }}
              justify='center'
              maxW={{ sm: "270px", md: "300px", lg: "100%" }}
              mx={{ sm: "auto", md: "0px" }}
              p='18px 22px'
              bg='linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgba(10, 14, 35) 91.2%)'
              borderRadius='20px'
              position='absolute'
              bottom='5%'>
              <Text fontSize='xs' color='gray.400'>
                0%
              </Text>
              <Flex direction='column' align='center' minW='80px'>
                <Text color='#fff' fontSize='28px' fontWeight='bold'>
                  95%
                </Text>
                <Text fontSize='xs' color='gray.400'>
                  Based on likes
                </Text>
              </Flex>
              <Text fontSize='xs' color='gray.400'>
                100%
              </Text>
            </Stack>
          </Flex>
        </Card> */}
        {/* Referral Tracking */}
        {/* <Card gridArea={{ md: "2 / 2 / 3 / 3", "2xl": "auto" }}>
          <Flex direction='column'>
            <Flex justify='space-between' align='center' mb='40px'>
              <Text color='#fff' fontSize='lg' fontWeight='bold'>
                Referral Tracking
              </Text>
              <Button
                borderRadius='12px'
                w='38px'
                h='38px'
                bg='#22234B'
                _hover='none'
                _active='none'>
                <Icon as={IoEllipsisHorizontal} color='#7551FF' />
              </Button>
            </Flex>
            <Flex direction={{ sm: "column", md: "row" }}>
              <Flex
                direction='column'
                me={{ md: "6px", lg: "52px" }}
                mb={{ sm: "16px", md: "0px" }}>
                <Flex
                  direction='column'
                  p='22px'
                  pe={{ sm: "22e", md: "8px", lg: "22px" }}
                  minW={{ sm: "220px", md: "140px", lg: "220px" }}
                  bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
                  borderRadius='20px'
                  mb='20px'>
                  <Text color='gray.400' fontSize='sm' mb='4px'>
                    Invited
                  </Text>
                  <Text color='#fff' fontSize='lg' fontWeight='bold'>
                    145 people
                  </Text>
                </Flex>
                <Flex
                  direction='column'
                  p='22px'
                  pe={{ sm: "22px", md: "8px", lg: "22px" }}
                  minW={{ sm: "170px", md: "140px", lg: "170px" }}
                  bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
                  borderRadius='20px'>
                  <Text color='gray.400' fontSize='sm' mb='4px'>
                    Bonus
                  </Text>
                  <Text color='#fff' fontSize='lg' fontWeight='bold'>
                    1,465
                  </Text>
                </Flex>
              </Flex>
              <Box mx={{ sm: "auto", md: "0px" }}>
                <GradientProgress
                  percent={70}
                  viewport
                  size={
                    window.innerWidth >= 1024
                      ? 200
                      : window.innerWidth >= 768
                      ? 170
                      : 200
                  }
                  isGradient
                  gradient={{
                    angle: 90,
                    startColor: "rgba(5, 205, 153, 0)",
                    stopColor: "#05CD99",
                  }}
                  emptyColor='transparent'>
                  <Flex direction='column' justify='center' align='center'>
                    <Text color='gray.400' fontSize='sm' mb='4px'>
                      Safety
                    </Text>
                    <Text
                      color='#fff'
                      fontSize={{ md: "36px", lg: "50px" }}
                      fontWeight='bold'
                      mb='4px'>
                      9.3
                    </Text>
                    <Text color='gray.400' fontSize='sm'>
                      Total Score
                    </Text>
                  </Flex>
                </GradientProgress>
              </Box>
            </Flex>
          </Flex>
        </Card> */}
      </SimpleGrid>
      {/* <Grid
        templateColumns={{ sm: "1fr", lg: "1.7fr 1.3fr" }}
        maxW={{ sm: "100%", md: "100%" }}
        gap='24px'
        mb='24px'>
        Sales Overview
        <Card p='28px 0px 0px 0px'>
          <CardHeader mb='20px' ps='22px'>
            <Flex direction='column' alignSelf='flex-start'>
              <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
                Sales Overview
              </Text>
              <Text fontSize='md' fontWeight='medium' color='gray.400'>
                <Text as='span' color='green.400' fontWeight='bold'>
                  (+5%) more
                </Text>{" "}
                in 2021
              </Text>
            </Flex>
          </CardHeader>
          <Box w='100%' minH={{ sm: "300px" }}>
            <LineChart
              lineChartData={lineChartDataDashboard}
              lineChartOptions={lineChartOptionsDashboard}
            />
          </Box>
        </Card>
        Active Users
        <Card p='16px'>
          <CardBody>
            <Flex direction='column' w='100%'>
              <Box
                bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
                borderRadius='20px'
                display={{ sm: "flex", md: "block" }}
                justify={{ sm: "center", md: "flex-start" }}
                align={{ sm: "center", md: "flex-start" }}
                minH={{ sm: "180px", md: "220px" }}
                p={{ sm: "0px", md: "22px" }}>
                <BarChart
                  barChartOptions={barChartOptionsDashboard}
                  barChartData={barChartDataDashboard}
                />
              </Box>
              <Flex
                direction='column'
                mt='24px'
                mb='36px'
                alignSelf='flex-start'>
                <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
                  Active Users
                </Text>
                <Text fontSize='md' fontWeight='medium' color='gray.400'>
                  <Text as='span' color='green.400' fontWeight='bold'>
                    (+23%)
                  </Text>{" "}
                  than last week
                </Text>
              </Flex>
              <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <WalletIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Users
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    32,984
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={20}
                  />
                </Flex>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <RocketIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Clicks
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    2.42m
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={90}
                  />
                </Flex>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <CartIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Sales
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    2,400$
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={30}
                  />
                </Flex>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <StatsIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Items
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    320
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={50}
                  />
                </Flex>
              </SimpleGrid>
            </Flex>
          </CardBody>
        </Card>
      </Grid> */}
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        gap="24px"
      >
        {/* Projects */}
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" pb="8px">
                League Table
              </Text>
              {/* <Flex align='center'>
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color='teal.300'
                  w={4}
                  h={4}
                  pe='3px'
                />
                <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                  <Text fontWeight='bold' as='span'>
                    30 done
                  </Text>{" "}
                  this month.
                </Text>
              </Flex> */}
            </Flex>
          </CardHeader>
          <Table variant="simple" color="#fff">
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th
                  ps="0px"
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Position
                </Th>
                <Th
                  ps="0px"
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Club
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Games Played
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Points
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Win %
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {leagueStandings.slice(0, 6).map((row, index, arr) => {
                const winPerc = Math.round((row.won / row.playedGames) * 100);
                return (
                  <DashboardTableRow
                    position={index + 1}
                    name={row.teamInfo.shortName}
                    // logo={row.teamInfo.crestUrl}
                    members={row.playedGames}
                    budget={row.points}
                    progression={winPerc}
                    lastItem={index === arr.length - 1 ? true : false}
                    maxGamesPlayed={maxGamesPlayed}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Card>
        {/* Orders Overview */}
        <Card>
          <CardHeader mb="32px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
                Upcoming Fixtures
              </Text>
              {/* <Flex align='center'>
                <Icon
                  as={AiFillCheckCircle}
                  color='green.500'
                  w='15px'
                  h='15px'
                  me='5px'
                />
                <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                  <Text fontWeight='bold' as='span' color='gray.400'>
                    +30%
                  </Text>{" "}
                  this month
                </Text>
              </Flex> */}
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" lineHeight="21px">
              {timelineData.map((row, index, arr) => {
                const title = `${upcomingMatches[index].homeTeam} vs ${upcomingMatches[index].awayTeam}`;
                return (
                  <TimelineRow
                    logo={row.logo}
                    title={title}
                    date={upcomingMatches[index].utcDate}
                    color={row.color}
                    index={index}
                    arrLength={arr.length}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
