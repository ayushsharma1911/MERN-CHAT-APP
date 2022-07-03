import React from "react";

import { useHistory } from "react-router";
import { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import Login from './auth/Login.js'
import Signup from './auth/Signup.js'

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="end"
        textAlign="center"
        alignItems="center"
        p={3}
        bg="
#43b9a9"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="5%"
        borderWidth="5px"
        borderColor="
#fed047 "
      >
        <Text fontSize="4xl" fontFamily="Indie Flower" fontWeight="bold" color="white">
          BuddychatS !
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="5%" borderWidth="5px" borderColor="
#fed047 " backgroundColor="
#43b9a9">
        <Tabs isFitted variant="soft-rounded"  color="white">
          <TabList mb="1em" >
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel> <Login /></TabPanel>
            <TabPanel>  <Signup/></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
