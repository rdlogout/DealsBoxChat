import { useState } from "react";
import { Form } from "react-bootstrap";
import { MdSend } from "react-icons/md";
import Emoji from "./emoji";

const ChatTextBox = ({ chatId, send }) => {
  const [state, setState] = useState(initState);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!state.message) return;
    const msg = {
      msg: state.message,
      chatId,
      id: state.messageId,
    };
    send(msg);
    setState(initState);
    e.target.reset();
  };

  return (
    <div id="input-box" className="chat-inputbox">
      <Form className="content" onSubmit={HandleSubmit}>
        <input
          placeholder="Write your messages..."
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
        />
        <Emoji state={state} setState={(e) => setState(e)} />
        {/* <Emoji
          push={(e) => setState({ ...state, message: state.message + e })}
        />
        <label role="button" disable={state.uploading} htmlFor="upload-file">
          <ImAttachment />
        </label> */}
        <div className="send-btn">
          <button role="submit">
            <MdSend />
          </button>
        </div>
        {/* <input
          type="file"
          className="d-none"
          onChange={(e) => setState({ ...state, files: e.target.files })}
          id="upload-file"
        /> */}
      </Form>
    </div>
  );
};

const initState = {
  message: "",
};

export default ChatTextBox;
