import moment from "moment";
import { useSelector } from "react-redux";

const Message = (data) => {
  const { selfId, users } = useSelector((s) => s.chat);
  const sender = users.find((s) => s.id === data.user);
  const sent = selfId == sender.id;

  return (
    <>
      <div className={`chat-message ${!sent ? "in" : "message-out"}`}>
        <div className="user-image me-3">
          <img src="https://blog.hubspot.com/hubfs/How%20to%20Edit%20%26%20Customize%20User%20Roles%20in%20WordPress.jpeg" />
        </div>
        <div className="content">
          <p className="fw-bold font-tiny text-dark message-time">
            {sender?.name || "DealsOnOpenBox"},{" "}
            {moment(data.date).format("hh:mm A")}
          </p>
          <div className="message-box right">
            {data.files?.map((x, i) => (
              <RenderFile key={i} x={x} />
            ))}
            <p className="mb-0">{data.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
