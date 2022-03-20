import moment from "moment";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { useState } from "react";

const ChatMessage = ({ data, messageDirection, name }) => {
  if (!data.content && !data.files?.length > 0) return null;

  const RenderFile = ({ x }) => {
    // const [loading, setLoading] = useState(false);
    // const DownloadFile = (e) => {
    //   // setLoading(true);
    //   var link = document.createElement("a");
    //   link.setAttribute("download", x.clientName);
    //   link.href =
    //   document.body.appendChild(link);
    //   link.click();
    //   link.remove();
    // };
    return (
      <div className="message-media">
        <div className="media text-truncate d-flex align-items-center">
          <IoMdDocument className="me-2 text-primary" />
          <p className="text-blue font-sm mb-0">{x.clientName}</p>
        </div>
        <a
          className="download-btn"
          href={"https://dealsonopenbox.azureedge.net/" + x.uri}
          download={x.clientName}
        >
          <MdOutlineFileDownload className="fs-6" />
        </a>
      </div>
    );
  };

  return (
    <>
      <div
        className={`chat-message ${
          !name ? "in" : messageDirection ? "in" : "message-out"
        }`}
      >
        <div className="user-image me-3">
          <img src="https://blog.hubspot.com/hubfs/How%20to%20Edit%20%26%20Customize%20User%20Roles%20in%20WordPress.jpeg" />
        </div>
        <div className="content">
          <p className="fw-bold font-tiny text-dark message-time">
            {name || "DealsOnOpenBox"}, {moment(data.date).format("hh:mm A")}
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

export default ChatMessage;
