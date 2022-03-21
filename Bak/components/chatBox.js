import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChatMessage from "./chatMessage";
import ChatContext from "./context";

const ChatBox = ({ chatId, connection, userData }) => {
  const [data, setData] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    LoadData();
  }, [chatId]);

  useEffect(() => {
    if (connection)
      connection.on("ReceiveMessage", (x) => {
        const message = JSON.parse(x);
        console.log(message);
        setMessages((x) => [...x, message]);
        ScrollToBottom();
      });
  }, [connection]);

  const LoadData = () => {
    setData();
    if (chatId)
      axios("/home/" + chatId)
        .then(({ data }) => {
          setData(data);
          setMessages(data.messages.reverse());
        })
        .catch((x) => console.log(x));
  };

  return (
    <div className="chat-box">
      <Container className="chat-title py-4 px-5">
        <Row>
          <Col sm="11">
            <p className="mb-0 text-dark fw-bold fs-6 text-truncate">
              {data?.title || "Loading ...."}
            </p>
          </Col>
          <Col sm="1">
            <ChatContext {...data} />
          </Col>
        </Row>
      </Container>
      <div className="d-flex flex-column messages-list" id="messages-list">
        {data ? (
          Array.from(messages).map((x, i) => (
            <ChatMessage
              key={i}
              data={x}
              name={data.users.find((s) => s.id !== x.user)?.name}
              sent={x.user === data.selfId}
              messageDirection={x.user == data.selfId}
            />
          ))
        ) : (
          <>
            <ShrimerLoading />
            <ShrimerLoading className="message-out" />
          </>
        )}
      </div>
    </div>
  );
};

const ShrimerLoading = ({ className }) => (
  <div
    className={`chat-message rounded-pills p-4 bg-white shimmer-animate ${className} `}
  />
);

const ScrollToBottom = () =>
  setTimeout(() => {
    const element = document.getElementById("messages-list");
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  }, 20);

export default ChatBox;
