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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  Grid,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import LineChart from "components/Charts/LineChart";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import {
  lineChartDataDashboard,
  lineChartOptionsDashboard,
} from "variables/charts";
import { tablesProjectData, tablesTableData } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

// query
import { useLeagueStandings } from "query/leagueStandings";
import { useStockPrices } from "query/stockPrices";
import { useUser } from "query/user";

function StockPriceChart(props) {
  const history = useHistory();

  const userResp = useUser();
  const stockPricesResp = useStockPrices(props.teamInfo.teamId);

  if (stockPricesResp.isFetching || userResp.isFetching) {
    return <Text>Loading</Text>;
  }

  if (!!userResp.error || !!stockPricesResp.error) {
    history.push("/auth");
    history.go(0); // reloads the page
  }

  const stockPrices = stockPricesResp.data.map((item) => item.stockPrice);
  const stockPricesChartOption = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: stockPricesResp.data.map((item) => `${item.matchday}`),
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#2CD9FF", "#582CFF"],
    },
    colors: ["#2CD9FF", "#582CFF"],
  };

  return (
    <LineChart
      lineChartData={[{ name: props.teamInfo.shortName, data: stockPrices }]}
      lineChartOptions={stockPricesChartOption}
    />
  );
}

function Tables() {
  const [selectedClubIndex, setSelectedClubIndex] = useState(0);
  // const {
  //   status,
  //   data: leagueStandings,
  //   error,
  //   isFetching,
  // } = useLeagueStandings()

  const leagueStandingsResp = useLeagueStandings();

  if (leagueStandingsResp.isFetching) {
    return <Text>Loading</Text>;
  }
  const leagueStandings = leagueStandingsResp.data;

  const maxGamesPlayed = Math.max(
    ...leagueStandings.map((item) => item.playedGames)
  );
  const selectedClub = leagueStandings[selectedClubIndex];

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function getStockPriceValue(x) {
    return `€${numberWithCommas(x)}`;
  }

  return (
    <Flex direction="column" pt={{ base: "40px", md: "0px" }}>
      <Card>
        <CardHeader py="12px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            {selectedClub.teamInfo.name}
          </Text>
        </CardHeader>
        <CardBody pt="12px">
          <Flex direction="column" w="100%">
            <Grid templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}>
              <Flex
                justify="space-between"
                p="22px"
                mb="18px"
                bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                borderRadius="18px"
              >
                <Flex direction="column">
                  <Text color="#E9EDF7" fontSize="12px">
                    Points
                  </Text>
                  <Text color="#fff" fontWeight="bold" fontSize="24px">
                    {selectedClub.points}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                justify="space-between"
                p="22px"
                mb="18px"
                bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                borderRadius="18px"
              >
                <Flex direction="column">
                  <Text color="#E9EDF7" fontSize="12px">
                    Games Played
                  </Text>
                  <Text color="#fff" fontWeight="bold" fontSize="24px">
                    {selectedClub.playedGames}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                justify="space-between"
                p="22px"
                mb="18px"
                bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                borderRadius="18px"
              >
                <Flex direction="column">
                  <Text color="#E9EDF7" fontSize="12px">
                    Standing
                  </Text>
                  <Text color="#fff" fontWeight="bold" fontSize="24px">
                    {selectedClubIndex + 1}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                justify="space-between"
                p="22px"
                mb="18px"
                bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                borderRadius="18px"
              >
                <Flex direction="column">
                  <Text color="#E9EDF7" fontSize="12px">
                    Goal Difference
                  </Text>
                  <Text color="#fff" fontWeight="bold" fontSize="24px">
                    {selectedClub.goalDifference}
                  </Text>
                </Flex>
              </Flex>
            </Grid>
            <Box w="100%" minH={{ sm: "300px" }}>
              <StockPriceChart teamInfo={selectedClub.teamInfo} />
            </Box>
            <Flex direction="column" py="12px">
              <Flex align="center" gap="12px">
                <Text color="#E9EDF7" fontSize="sm" fontWeight="bold">
                  Buy
                </Text>
                <NumberInput
                  maxW="100px"
                  defaultValue={15}
                  min={1}
                  max={20}
                  color="white"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text color="#E9EDF7" fontSize="sm" fontWeight="bold">
                  at {getStockPriceValue(selectedClub.stockPrice.value)} per
                  stock.
                </Text>
              </Flex>
              <Button my="1rem" borderRadius="12px" colorScheme="blackAlpha">
                Buy
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {/* Authors Table */}
      {/* <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='lg' color='#fff' fontWeight='bold'>
            Authors Table
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px' color='gray.400'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Author
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Function
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Status
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Employed
                </Th>
                <Th borderBottomColor='#56577A'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    logo={row.logo}
                    email={row.email}
                    subdomain={row.subdomain}
                    domain={row.domain}
                    status={row.status}
                    date={row.date}
                    lastItem={index === arr.length - 1 ? true : false}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card> */}
      {/* Projects Table */}
      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color="#fff" fontWeight="bold" mb=".5rem">
              League Table
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
                  Points
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
                  Win %
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Stock Price
                </Th>
                {/* <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Points
                </Th> */}
                {/* <Th borderBottomColor='#56577A'></Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {leagueStandings.map((row, index, arr) => {
                const winPerc = Math.round((row.won / row.playedGames) * 100);
                return (
                  <TablesProjectRow
                    position={index + 1}
                    name={row.teamInfo.shortName}
                    upNextName={getStockPriceValue(row.stockPrice.value)}
                    stockPriceDiff={row.stockPrice.diff}
                    // logo={row.logo}
                    status={row.playedGames}
                    budget={row.points}
                    progression={winPerc}
                    lastItem={index === arr.length - 1 ? true : false}
                    maxGamesPlayed={maxGamesPlayed}
                    onClick={() => {
                      setSelectedClubIndex(index);
                      window.scrollTo(0, 0);
                    }}
                    isSelected={index == selectedClubIndex}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
