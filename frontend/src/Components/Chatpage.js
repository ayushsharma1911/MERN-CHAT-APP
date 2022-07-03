import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from './missl/sideDrawer'
import MyChats from "./Mychats";
import Chatbox from "./Chatbox";
const Chatpage = () => {
  //to update the chatbox if you leave any grp
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;