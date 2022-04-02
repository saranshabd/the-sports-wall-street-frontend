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
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";

function DashboardTableRow(props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    position,
    logo,
    name,
    upNextName,
    status,
    budget,
    progression,
    lastItem,
    showButton,
    maxGamesPlayed,
    onClick,
    rowOnClick,
    isSelected,
    stockPriceDiff,
    showProgressionColor,
    showPosition,
    buyingPrice,
    goalDifference,
    isLocked,
  } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const statusColor = status < maxGamesPlayed ? "green.400" : "white";
  const nameColor = isSelected ? "gold" : "white";
  const stockColor = stockPriceDiff > 0 ? "green.400" : "red.400";

  return (
    <Tr onClick={rowOnClick} _hover={{ cursor: "pointer" }}>
      {showPosition && (
        <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
          <Text fontSize="sm" color={nameColor} fontWeight="bold">
            {position}
            {isNaN(position.toString()) ? "" : "."}
          </Text>
        </Td>
      )}
      <Td
        // minWidth={{ sm: "125px" }}
        ps="0px"
        borderBottomColor="#56577A"
        border={lastItem ? "none" : null}
      >
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Icon as={logo} h={"20px"} w={"20px"} me='18px' /> */}
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={nameColor}
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Text fontSize="sm" color="#fff" fontWeight="bold">
          {budget}
        </Text>
      </Td>
      {buyingPrice && (
        <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
          <Text
            fontSize="sm"
            color={progression < 0 ? "red.400" : "green.400"}
            fontWeight="bold"
          >
            {buyingPrice}
          </Text>
        </Td>
      )}
      {status && (
        <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
          <Text fontSize="sm" color={statusColor} fontWeight="bold">
            {status}
          </Text>
        </Td>
      )}
      {goalDifference && (
        <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
          <Text fontSize="sm" color="white" fontWeight="bold">
            {goalDifference}
          </Text>
        </Td>
      )}
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Flex direction="column">
          <Text
            fontSize="sm"
            color={
              showProgressionColor
                ? progression < 0
                  ? "red.400"
                  : "green.400"
                : "white"
            }
            fontWeight="bold"
            pb=".2rem"
          >{`${progression}%`}</Text>
          <Progress
            colorScheme={progression < 0 ? "red" : "green"}
            maxW="125px"
            h="3px"
            bg="#2D2E5F"
            value={progression}
            borderRadius="15px"
          />
        </Flex>
      </Td>
      {stockPriceDiff && (
        <Td
          // minWidth={{ sm: "250px" }}
          // ps='0px'
          borderBottomColor="#56577A"
          border={lastItem ? "none" : null}
        >
          <Flex
            alignItems="center"
            py=".8rem"
            minWidth="100%"
            flexWrap="nowrap"
            gap="12px"
          >
            {/* <Icon as={logo} h={"20px"} w={"20px"} me='18px' /> */}
            <Text fontSize="sm" fontWeight="bold" color="white">
              {upNextName}
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={stockColor}>
              {stockPriceDiff > 0 && "+"}
              {stockPriceDiff}
            </Text>
          </Flex>
        </Td>
      )}
      {showButton && (
        <Td
          // pr="0px"
          borderBottomColor="#56577A"
          border={lastItem ? "none" : null}
        >
          <Button
            borderRadius="12px"
            colorScheme="blackAlpha"
            isFullWidth
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await onClick();
              setIsLoading(false);
            }}
            disabled={isLocked}
          >
            {/* <Icon as={FaEllipsisV} color='gray.400' cursor='pointer' /> */}
            Cash out
          </Button>
        </Td>
      )}
    </Tr>
  );
}

export default DashboardTableRow;
