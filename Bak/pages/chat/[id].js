import { withRouter } from "next/router";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import MainContent from "../../components/mainContent";
import ChatBox from "../../components/chatBox";
import ChatInput from "../../components/chatInput";
import ChatLayout from "../../components/layouts/ChatLayout";
import { Socket_uri } from "../../utils/request";

const ChatIndex = ({ router }) => {
  const [connection, setConnection] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(Socket_uri + "/chatSocket")
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
    <ChatLayout>
      <MainContent>
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
    </ChatLayout>
  );
};

export default withRouter(ChatIndex);
