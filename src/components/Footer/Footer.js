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

/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer(props) {
  function profileOnClick() {
    window.gtag("event", "footer_saranshabd_click"); // Google Analytics
  }

  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="center"
      px="30px"
      pb="20px"
    >
      <Text
        fontSize="sm"
        color="white"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        Made with 💰 by{" "}
        <Link
          fontWeight="bold"
          href="https://saranshabd.com"
          target="_blank"
          onClick={profileOnClick}
        >
          Shabd Saran
        </Link>
        {/* &copy; {1900 + new Date().getYear()},{" "}
        <Text as='span'>
          {document.documentElement.dir === "rtl"
            ? " مصنوع من ❤️ بواسطة"
            : "Made with ❤️ by "}
        </Text>
        <Link href='https://www.simmmple.com' target='_blank'>
          {document.documentElement.dir === "rtl"
            ? " توقيت الإبداعية"
            : "Simmmple "}
        </Link>
        &
        <Link href='https://www.creative-tim.com' target='_blank'>
          {document.documentElement.dir === "rtl" ? "سيممبل " : " Creative Tim"}
        </Link>
        {document.documentElement.dir === "rtl"
          ? "للحصول على ويب أفضل"
          : " for a better web"} */}
      </Text>
      {/* <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='white' fontSize='sm' href='https://www.simmmple.com'>
            {document.documentElement.dir === "rtl"
              ? "توقيت الإبداعية"
              : "Simmmple"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='white' fontSize='sm' href='https://www.creative-tim.com'>
            {document.documentElement.dir === "rtl" ? "سيممبل" : "Creative Tim"}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            color='white'
            fontSize='sm'
            href='https://creative-tim.com/blog'>
            {document.documentElement.dir === "rtl" ? "مدونة" : "Blog"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color='white'
            fontSize='sm'
            href='https://www.creative-tim.com/license'>
            {document.documentElement.dir === "rtl" ? "رخصة" : "License"}
          </Link>
        </ListItem>
      </List> */}
    </Flex>
  );
}
