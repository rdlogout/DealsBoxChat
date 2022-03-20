import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import SideBar from "../sideBar";

const ChatLayout = ({ children }) => {
  const [userData, setUserData] = useState();
  const [connection, setConnection] = useState();
  const [chatList, setChatList] = useState();
  const [activeChatId, setActiveChatId] = useState();
  useEffect(() => {
    LoadChatList();
    // const connect = new HubConnectionBuilder()
    //   .withUrl("/chatHub")
    //   .withAutomaticReconnect()
    //   .build();
    // setConnection(connect);
    setUserData(window.userData);
  }, []);

  //   useEffect(() => {
  //     if (connection) {
  //       connection.start().catch((error) => console.log(error));
  //     }
  //   }, [connection]);

  const LoadChatList = () =>
    axios("/api/home")
      .then(({ data }) => setChatList(data))
      .catch((x) => console.log(x));

  return (
    <>
      <Head>
        <title>Chat | DealsOnOpenBox</title>
      </Head>
      <div className="container chatLayout">
        <div className="row">
          <SideBar
            userData={userData}
            chatList={chatList}
            setChatId={setActiveChatId}
            activeChatId={activeChatId}
          />
          {children}
          {/* <MainContent
            userData={userData}
            connection={connection}
            chatId={activeChatId}
          /> */}
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
