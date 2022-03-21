import { Base_Uri } from "../../utils/static";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useSelector } from "react-redux";
import ChatTextBox from "./textbox";

const InputBox = ({ set }) => {
  const chat = useSelector((s) => s.chat);

  const [connection, setConnection] = useState();

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(Base_Uri + "/chatSocket")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      set(connection);
      connection.start().catch((error) => console.log(error));
    }
  }, [connection]);

  const Send = (obj) => {
    connection.send("SendMessage", JSON.stringify(obj));
  };

  return <ChatTextBox {...chat} chatId={chat.id} send={Send} />;
};

export default InputBox;
