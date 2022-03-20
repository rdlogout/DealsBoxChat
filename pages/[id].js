import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import MainContent from "../components/mainContent";
import ChatBox from "../components/chatBox";
import ChatInput from "../components/chatInput";

const debug = process.env.NODE_ENV === "development";

const ChatById = ({ router }) => {
  const [connection, setConnection] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl((debug ? "https:localhost:5001" : "") + "/chatHub")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
    setUserData(window.userData);
  }, []);
    
  useEffect(() => {
    if (connection) {
      connection.start().catch((error) => console.log(error));
    }
  }, [connection]);

  return (
    <>
      <MainContent col='12' style={{height:'100vh'}}>
        <ChatBox
          userData={userData}
          connection={connection}
          chatId={router.query.id}
        />
        <ChatInput
          userData={userData}
          connection={connection}
          chatId={router.query.id}
        />
      </MainContent>
    </>
  );
};

export default withRouter(ChatById);
