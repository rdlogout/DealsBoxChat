import { useSelector } from "react-redux";
import Message from "./message";

const ChatBox = () => {
  const { messages } = useSelector((s) => s.chat);

  return (
    <div
      className="d-flex flex-column messages-list py-5 px-3"
      id="messages-box"
    >
      {!messages ? "loading ..." : messages?.map((s) => <Message {...s} />)}
    </div>
  );
  if (!messages) return "loading...";
  return messages?.map((s) => <Message {...s} />);
};

export default ChatBox;
