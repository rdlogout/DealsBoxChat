import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ChatBox from "../components/chat/chatbox";
import Topbar from "../components/chat/topbar";
import InputBox from "../components/inputbox";
import chatActions from "../redux/actions/chatAction";

const ChatById = (props) => {
  const [connection, setConnection] = useState();

  const router = useRouter();
  const { loadData, pushMessage } = props;

  useEffect(() => {
    if (router.query.id) loadData(router.query.id);
  }, [router.query.id]);

  useEffect(() => {
    if (connection)
      connection.on("ReceiveMessage", (x) => {
        const message = JSON.parse(x);
        pushMessage(message);
        console.log(message);
        ScrollToBottom();
      });
  }, [connection]);

  return (
    <div id="chat-by-id">
      <Topbar title={props.title} />
      <ChatBox />
      <InputBox set={(e) => setConnection(e)} />
    </div>
  );
};

export default connect((s) => s.chat, chatActions)(ChatById);

const ScrollToBottom = () =>
  setTimeout(() => {
    const element = document.getElementById("messages-box");
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  }, 20);
