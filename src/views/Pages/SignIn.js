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

import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  DarkMode,
} from "@chakra-ui/react";

// Assets
import signInImage from "assets/img/signInImage.png";

// Custom Components
import AuthFooter from "components/Footer/AuthFooter";
import GradientBorder from "components/GradientBorder/GradientBorder";
import Loader from "components/Loader";

// Google/Facebook Sign In
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

import * as auth from "utils/auth";
import { useUser } from "query/user";

import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();

  const titleColor = "white";
  const textColor = "gray.400";

  async function signInOnSuccess(res) {
    const { tokenId } = res;
    await auth.signIn(tokenId);
    history.push("/admin");
  }

  function responseFacebook(response) {
    const { accessToken } = response;
    auth.facebookSignIn(accessToken).then(() => history.push("/admin"));
  }

  const { status, data, error, isFetching } = useUser();
  if (isFetching) {
    return <Loader />;
  }

  if (!error) {
    history.push("/admin");
  }

  return (
    <Flex position="relative">
      <Flex
        minH="100vh"
        h={{ base: "120vh", lg: "fit-content" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        pt={{ sm: "100px", md: "0px" }}
        flexDirection="column"
        me={{ base: "auto", lg: "50px", xl: "auto" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px="50px"
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            mt={{ base: "50px", md: "150px", lg: "160px", xl: "245px" }}
            mb={{ base: "60px", lg: "95px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Predict the future
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Become a Wall Street Pro Trader
            </Text>
            {/* <FormControl>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='normal'
                color='white'>
                Email
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  h='46px'
                  placeholder='Your email adress'
                />
              </GradientBorder>
            </FormControl>
            <FormControl>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='normal'
                color='white'>
                Password
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  type='password'
                  placeholder='Your password'
                />
              </GradientBorder>
            </FormControl> */}
            {/* <FormControl display='flex' alignItems='center'>
              <DarkMode>
                <Switch id='remember-login' colorScheme='brand' me='10px' />
              </DarkMode>
              <FormLabel
                htmlFor='remember-login'
                mb='0'
                ms='1'
                fontWeight='normal'
                color='white'>
                Remember me
              </FormLabel>
            </FormControl> */}

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={signInOnSuccess}
              // cookiePolicy="single_host_origin"
              // isSignedIn={true}
            />
            {/* <br /> */}
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
              size="metro"
              textButton="Continue with Facebook"
              containerStyle={{ paddingTop: "1rem" }}
              buttonStyle={{
                width: "100%",
                padding: "0.5rem 1rem",
                textTransform: "none",
              }}
              // onClick={(resp) => console.log(resp)}
            />

            {/* <Button
              variant='brand'
              fontSize='xs'
              // type='submit'
              w='100%'
              maxW='350px'
              h='45'
              mb='20px'
              mt='20px'
              fontWeight='extrabold'>
              SIGN IN WITH GOOGLE
            </Button> */}

            {/* <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link color={titleColor} as='span' ms='5px' fontWeight='bold'>
                  Sign Up
                </Link>
              </Text>
            </Flex> */}
          </Flex>
        </Flex>
        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb="80px"
        >
          {/* <AuthFooter /> */}
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX="hidden"
          h="100%"
          maxW={{ md: "50vw", lg: "50vw" }}
          minH="100vh"
          w="960px"
          position="absolute"
          left="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            // position="absolute"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="absolute"
          >
            <Text
              textAlign="center"
              color="white"
              letterSpacing="8px"
              fontSize="20px"
              fontWeight="500"
            >
              VIRTUAL CURRENCY SPORTS TRADING
            </Text>
            <Text
              textAlign="center"
              color="transparent"
              letterSpacing="8px"
              fontSize="36px"
              fontWeight="bold"
              bgClip="text !important"
              // bg='linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)'
              bg="white"
            >
              BEAT THE ORDINARY
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
