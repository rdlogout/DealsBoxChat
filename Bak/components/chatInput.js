import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import toast from "react-hot-toast";
import { ImAttachment } from "react-icons/im";
import { IoMdCheckmark } from "react-icons/io";
import { MdSend, MdPauseCircleOutline, MdOutlineClose } from "react-icons/md";
import { Emoji, Spinner } from "./Shared";

const ChatInput = ({ connection, chatId }) => {
  const [connected, setConnected] = useState(false);
  const [files, setFiles] = useState();
  const [messageId, setMessageId] = useState();
  const [message, setMessage] = useState("");

  const [state, setState] = useState({
    uploading: false,
    files: null,
    message: "",
    messageId: null,
    disable: false,
  });

  useEffect(() => {
    console.log(connection?._connectionState === "Connected", connected);
    setConnected(connection?._connectionState === "Connected");
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (message.length === 0 && !connection) return null;
    connection.send(
      "SendMessage",
      JSON.stringify({
        msg: state.message,
        chatId,
        id: state.messageId,
      })
    );
    ResetInput(e);
  };

  const UpdateState = (property, value) => {
    state[property] = value;
    return state;
  };

  const ResetInput = (e) => {
    setState({
      ...state,
      message: "",
      messageId: null,
      files: state.uploading ? state.files : null,
    });
    e.target.reset();
  };

  return (
    <div className="chat-inputbox">
      <FileUpload chatId={chatId} state={state} setState={(e) => setState(e)} />
      <form className="content" onSubmit={HandleSubmit}>
        <input
          placeholder="Write your messages..."
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
        />
        <Emoji
          push={(e) => setState({ ...state, message: state.message + e })}
        />
        <label role="button" disable={state.uploading} htmlFor="upload-file">
          <ImAttachment />
        </label>
        <div className="send-btn">
          <button role="submit">
            {!connected & false ? <Spinner /> : <MdSend />}
          </button>
        </div>
        <input
          type="file"
          className="d-none"
          onChange={(e) => setState({ ...state, files: e.target.files })}
          id="upload-file"
        />
      </form>
    </div>
  );
};

export default ChatInput;

const FileUpload = ({ state, setState, chatId }) => {
  useEffect(() => {
    if (state.files && !state.uploading) HandleFileUpload();
  }, [state.files]);

  const [progress, setProgress] = useState();
  const HandleFileUpload = () => {
    setState({ ...state, uploading: true });
    const formData = new FormData();
    Array.from(state.files).map((x) => formData.append("files", x));
    axios
      .post("/api/home/UploadFile/" + chatId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((x) => setState({ ...state, messageId: x.data }))
      .catch((x) => {
        toast.error("Oops Failed To Upload File");
      })
      .then((s) => setState({ ...state, uploading: false }));
  };

  if (!state.files && !state.uploading) return null;

  return (
    <div className="message-upload">
      <div className="d-flex w-100 align-items-center">
        {progress === 100 ? (
          <div role="button" className="completed font-tiny">
            <IoMdCheckmark className="text-success" />
          </div>
        ) : (
          <p>{progress}%</p>
        )}

        {progress === 100 ? (
          <p className="flex-grow-1 mx-3 text-blue">
            {state.files[0].name}
            {state.files.length > 1
              ? ` and ${state.files.length - 1} other ..`
              : ""}
          </p>
        ) : (
          <ProgressBar animated now={progress} className="flex-grow-1 mx-3" />
        )}
        {/* 
                <div role='button' className={`${progress === 100 ? 'd-none' : ''}`}>
                    <MdPauseCircleOutline />
                </div> */}
        <div role="button" className="close">
          <MdOutlineClose
            onClick={(e) => setState({ ...state, uploading: false })}
          />
        </div>
      </div>
    </div>
  );
};
