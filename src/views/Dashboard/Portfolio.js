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
import { useQueryClient } from "react-query";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";

// Images
import BackgroundCard1 from "assets/img/billing-background-card.png";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import IconBox from "components/Icons/IconBox";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";
import Loader from "components/Loader";
import Prizes from "components/Prizes";
import TimelineRow from "components/Tables/TimelineRow";

// Icons
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { RiMastercardFill } from "react-icons/ri";
import {
  BillIcon,
  GraphIcon,
  MastercardIcon,
  VisaIcon,
} from "components/Icons/Icons";

// Data
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";
import { tablesProjectData, tablesTableData } from "variables/general";

import { useUser } from "query/user";
import * as portfolioUtils from "utils/portfolio";
import { isLoading } from "utils/auth";
import { useUpcomingMatches } from "query/matches";

function UpcomingFixtures() {
  const upcomingMatchesResp = useUpcomingMatches();

  if (isLoading(upcomingMatchesResp)) {
    return <Loader />;
  }
  if (!!upcomingMatchesResp.error) {
    window.gtag("event", "false_auth_error"); // Google Analytics
    history.push("/");
    history.go(0); // reloads the page
  }

  const upcomingMatches = upcomingMatchesResp.data;

  return (
    <Card w="100%" maxW="25rem">
      <CardHeader mb="32px">
        <Flex direction="column">
          <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
            Upcoming Fixtures
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" lineHeight="21px">
          {upcomingMatches.map((row, index, arr) => {
            return (
              <TimelineRow
                logo={row.logo}
                title={`${row.homeTeam} vs ${row.awayTeam}`}
                date={row.utcDate}
                color={row.color}
                index={index}
                arrLength={arr.length}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
}

function Portfolio() {
  const history = useHistory();
  const queryClient = useQueryClient();

  // Update the title of the page
  useEffect(() => {
    document.title = "Sports Wall St. | Portfolio";
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

  const user = userResp.data;
  const { investments: portfolio } = user.portfolio;

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

  const totalNetWorth = getTotalNetWorth();
  const diffPerc = ((totalNetWorth - 100_000) / 1000).toFixed(2);

  return (
    <Flex direction="column" pt={{ base: "0px", md: "0px" }} mx="auto">
      <Grid templateColumns={{ sm: "1fr", lg: "100% 100%" }}>
        <Box>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
            }}
            gap="26px"
          >
            <Prizes />
            {/* Credit Balance */}
            <Card>
              <Grid templateColumns="1fr">
                <Flex
                  justify="space-between"
                  p="22px"
                  mb="18px"
                  bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                  borderRadius="18px"
                >
                  <Flex direction="column">
                    <Text color="#E9EDF7" fontSize="12px">
                      Welcome back,
                    </Text>
                    <Text color="#fff" fontWeight="bold" fontSize="xl">
                      {user.username || user.name}
                    </Text>
                  </Flex>
                  {/* <Flex direction='column'>
                    <Button
                      bg='transparent'
                      _hover='none'
                      _active='none'
                      alignSelf='flex-end'
                      p='0px'>
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color='#fff'
                        w='24px'
                        h='24px'
                        justifySelf='flex-start'
                        alignSelf='flex-start'
                      />
                    </Button>
                    <GraphIcon w='60px' h='18px' />
                  </Flex> */}
                </Flex>
              </Grid>
              <Grid templateColumns="1fr 1fr" gap={5}>
                <Box
                  justify="space-between"
                  p="22px"
                  // mb="18px"
                  bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                  borderRadius="18px"
                >
                  <Flex direction="column">
                    <Text color="#E9EDF7" fontSize="12px">
                      Net worth
                    </Text>
                    <Text color="#fff" fontWeight="bold" fontSize="xl">
                      €{numberWithCommas(totalNetWorth)}
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    {/* <Text color='#E9EDF7' fontSize='12px'>
                      Net worth
                    </Text> */}
                    <Text
                      // color="#fff"
                      fontWeight="bold"
                      color={diffPerc < 0 ? "red.400" : "green.400"}
                      fontSize="xs"
                    >
                      {diffPerc}%
                    </Text>
                  </Flex>
                  {/* <Flex direction='column'>
                    <Button
                      bg='transparent'
                      _hover='none'
                      _active='none'
                      alignSelf='flex-end'
                      p='0px'>
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color='#fff'
                        w='24px'
                        h='24px'
                        justifySelf='flex-start'
                        alignSelf='flex-start'
                      />
                    </Button>
                    <GraphIcon w='60px' h='18px' />
                  </Flex> */}
                </Box>
                <Box
                  justify="space-between"
                  p="22px"
                  // mb="18px"
                  bg="linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)"
                  borderRadius="18px"
                >
                  <Flex direction="column">
                    <Text color="#E9EDF7" fontSize="12px">
                      Cash
                    </Text>
                    <Text color="#fff" fontWeight="bold" fontSize="xl">
                      €{numberWithCommas(user.portfolio.cash)}
                    </Text>
                  </Flex>
                  {/* <Flex direction='column'>
                    <Button
                      bg='transparent'
                      _hover='none'
                      _active='none'
                      alignSelf='flex-end'
                      p='0px'>
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color='#fff'
                        w='24px'
                        h='24px'
                        justifySelf='flex-start'
                        alignSelf='flex-start'
                      />
                    </Button>
                    <GraphIcon w='60px' h='18px' />
                  </Flex> */}
                </Box>
                {/* <Text fontSize='10px' color='gray.400' mb='8px'>
                  NEWEST
                </Text>
                <Flex justify='space-between' align='center'>
                  <Flex align='center'>
                    <IconBox
                      bg='#22234B'
                      borderRadius='30px'
                      w='42px'
                      h='42px'
                      me='10px'>
                      <BillIcon w='22px' h='22px' />
                    </IconBox>
                    <Flex direction='column'>
                      <Text color='#fff' fontSize='sm' mb='2px'>
                        Bill & Taxes
                      </Text>
                      <Text color='gray.400' fontSize='sm'>
                        Today, 16:36
                      </Text>
                    </Flex>
                  </Flex>
                  <Text color='#fff' fontSize='sm' fontWeight='bold'>
                    -$154.50
                  </Text>
                </Flex> */}
              </Grid>
            </Card>
          </Grid>
          {/* Payment Method */}
          {/* <Card p='16px' mt='24px'>
            <CardHeader>
              <Flex
                justify='space-between'
                align='center'
                minHeight='60px'
                w='100%'>
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                  Payment Method
                </Text>
                <Button maxW='135px' fontSize='10px' variant='brand'>
                  ADD A NEW CARD
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                align='center'
                w='100%'
                justify='center'
                py='1rem'>
                <GradientBorder
                  mb={{ sm: "24px", md: "0px" }}
                  me={{ sm: "0px", md: "24px" }}
                  w='100%'
                  borderRadius='20px'>
                  <Flex
                    p='22px'
                    bg='rgb(31, 35, 89)'
                    border='transparent'
                    borderRadius='20px'
                    align='center'
                    w='100%'>
                    <IconBox me='10px' w='25px' h='22px'>
                      <MastercardIcon w='100%' h='100%' />
                    </IconBox>
                    <Text color='#fff' fontSize='sm'>
                      7812 2139 0823 XXXX
                    </Text>
                    <Spacer />
                    <Button
                      p='0px'
                      bg='transparent'
                      w='16px'
                      h='16px'
                      variant='no-hover'>
                      <Icon as={FaPencilAlt} color='#fff' w='12px' h='12px' />
                    </Button>
                  </Flex>
                </GradientBorder>
                <GradientBorder w='100%' borderRadius='20px'>
                  <Flex
                    p='22px'
                    bg='rgb(31, 35, 89)'
                    w='100%'
                    borderRadius='20px'
                    border='transparent'
                    align='center'>
                    <IconBox me='10px' w='25px' h='25px'>
                      <VisaIcon w='100%' h='100%' color='#fff' />
                    </IconBox>
                    <Text color='#fff' fontSize='sm'>
                      7812 2139 0823 XXXX
                    </Text>
                    <Spacer />
                    <Button
                      p='0px'
                      bg='transparent'
                      w='16px'
                      h='16px'
                      variant='no-hover'>
                      <Icon as={FaPencilAlt} color='#fff' w='12px' h='12px' />
                    </Button>
                  </Flex>
                </GradientBorder>
              </Flex>
            </CardBody>
          </Card> */}
        </Box>
        {/* Invoices List */}
        {/* <Card
          p='22px'
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}
          >
          <CardHeader>
            <Flex
              justify='space-between'
              align='center'
              mb='1rem'
              w='100%'
              mb='28px'>
              <Text fontSize='lg' color='#fff' fontWeight='bold'>
                Invoices
              </Text>
              <Button
                variant='brand'
                fontSize='10px'
                fontWeight='bold'
                p='6px 32px'>
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              {invoicesData.map((row) => {
                return (
                  <InvoicesRow
                    date={row.date}
                    code={row.code}
                    price={row.price}
                    logo={row.logo}
                    format={row.format}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card> */}
      </Grid>
      <Button
        colorScheme={"teal"}
        mt="1.5rem"
        onClick={() => history.push("/admin/marketplace")}
      >
        Buy Stocks
      </Button>
      <Grid templateColumns={{ sm: "1fr", lg: "100%" }}>
        {/* Billing Information */}
        <Card
          my={{ sm: "24px", lg: "24px" }}
          me={{ sm: "24px", lg: "24px" }}
          overflowX={{ sm: "scroll", xl: "hidden" }}
        >
          <Flex direction="column">
            <CardHeader py="12px">
              <Flex direction={"column"}>
                <Text color="#fff" fontSize="xl" fontWeight="bold">
                  Investments
                </Text>
                <Text fontSize="sm" color="red.400">
                  You cannot sell stocks while the team match is underway.
                </Text>
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
                      Index
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
                      Buying Price
                    </Th>
                    <Th
                      color="gray.400"
                      fontFamily="Plus Jakarta Display"
                      borderBottomColor="#56577A"
                    >
                      Stock Price
                    </Th>
                    <Th
                      color="gray.400"
                      fontFamily="Plus Jakarta Display"
                      borderBottomColor="#56577A"
                    >
                      Units Owned
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
                      Upcoming Fixtures
                    </Th>
                    <Th
                      color='gray.400'
                      fontFamily='Plus Jakarta Display'
                      borderBottomColor='#56577A'>
                      Points
                    </Th> */}
                    {/* <Th borderBottomColor='#56577A'></Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {portfolio.map((row, index, arr) => {
                    const returns =
                      (row.latestStockPrice - row.buyingPrice) /
                      row.buyingPrice;
                    return (
                      <TablesProjectRow
                        position={index + 1}
                        name={row.teamId.shortName}
                        showProgressionColor={true}
                        status={row.stocksCount}
                        budget={`€${numberWithCommas(
                          Math.round(row.buyingPrice)
                        )}`}
                        buyingPrice={`€${numberWithCommas(
                          row.latestStockPrice
                        )}`}
                        progression={Math.round(returns * 100)}
                        lastItem={index === portfolio.length - 1 ? true : false}
                        showButton={true}
                        showPosition={true}
                        onClick={async () => {
                          const teamName = row.teamId.shortName
                            .split(" ")
                            .join("_");
                          window.gtag("event", `portfolio_${teamName}_cashout`); // Google Analytics
                          const teamIdToSell = row.teamId.teamId;
                          await portfolioUtils.sellAll(teamIdToSell);
                          queryClient.invalidateQueries("portfolio"); // clear portfolio cache
                          queryClient.invalidateQueries("user"); // clear portfolio cache
                        }}
                        isLocked={row.teamId.isLocked}
                      />
                    );
                  })}
                </Tbody>
              </Table>
              {/* <Flex direction='column' w='100%'>
                {billingData.map((row) => {
                  return (
                    <BillingRow
                      name={row.name}
                      company={row.company}
                      email={row.email}
                      number={row.number}
                    />
                  );
                })}
              </Flex> */}
            </CardBody>
          </Flex>
        </Card>
        <UpcomingFixtures />
        {/* Transactions List */}
        {/* <Card my='24px' ms={{ lg: "24px" }}>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: "column", lg: "row" }}
                justify={{ sm: "center", lg: "space-between" }}
                align={{ sm: "center" }}
                w='100%'
                my={{ md: "12px" }}>
                <Text
                  color='#fff'
                  fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                  fontWeight='bold'>
                  Your Transactions
                </Text>
                <Flex align='center'>
                  <Icon
                    as={FaRegCalendarAlt}
                    color='gray.400'
                    w='15px'
                    h='15px'
                    color='#fff'
                    me='6px'
                  />
                  <Text color='gray.400' fontSize='sm'>
                    23 - 30 March 2021
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              <Text color='gray.400' fontSize='xs' mb='18px'>
                NEWEST
              </Text>
              {newestTransactions.map((row) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                  />
                );
              })}
              <Text color='gray.400' fontSize='xs' my='18px'>
                OLDER
              </Text>
              {olderTransactions.map((row) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card> */}
      </Grid>
    </Flex>
  );
}

export default Portfolio;
