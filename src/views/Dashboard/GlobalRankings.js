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
  CloseButton,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Image,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import LineChart from "components/Charts/LineChart";
import Loader from "components/Loader";
import Prizes from "components/Prizes";

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
import { useGlobalRankings } from "query/globalRankings";
import { useStockPrices } from "query/stockPrices";
import { useUser } from "query/user";

function GlobalRankings() {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  // const {
  //   status,
  //   data: leagueStandings,
  //   error,
  //   isFetching,
  // } = useLeagueStandings()

  const userResp = useUser();
  const globalRankingsResp = useGlobalRankings();

  if (userResp.isFetching || globalRankingsResp.isFetching) {
    return <Loader />;
  }
  if (!!userResp.error || !!globalRankingsResp.error) {
    history.push("/");
    history.go(0); // reloads the page
  }

  const user = userResp.data;
  const globalRankings = globalRankingsResp.data;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function getStockPriceValue(x) {
    return `€${numberWithCommas(x)}`;
  }

  return (
    <Flex direction="column" pt={{ base: "0px", md: "0px" }}>
      {"" !== errorMessage && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <CardHeader>
        <Prizes />
      </CardHeader>
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
                  Player
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Net worth
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Returns
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
              {globalRankings.map((row, index, arr) => {
                return (
                  <TablesProjectRow
                    position={index < 3 ? "👑" : index < 10 ? "⚔️" : index + 1}
                    name={row.user.name}
                    // upNextName={getStockPriceValue(row.stockPrice.value)}
                    // stockPriceDiff={row.stockPrice.diff}
                    // status={row.playedGames}
                    budget={`€${numberWithCommas(row.netWorth)}`}
                    progression={numberWithCommas(row.returns)}
                    lastItem={index === arr.length - 1 ? true : false}
                    // maxGamesPlayed={maxGamesPlayed}
                    // rowOnClick={() => {
                    //   const teamName = row.teamInfo.shortName
                    //     .split(" ")
                    //     .join("_");
                    //   window.gtag("event", `tables_${teamName}_select`); // Google Analytics
                    //   setSelectedClubIndex(index);
                    //   setSelectedStocksCount(15);
                    //   window.scrollTo(0, 0);
                    // }}
                    // isSelected={index == selectedClubIndex}
                    showPosition={true}
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

export default GlobalRankings;
