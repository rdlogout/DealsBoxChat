import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { MdArrowBackIos, MdOutlineFileUpload } from "react-icons/md";
import Link from "next/link";
const SideBar = ({ chatList, activeChatId, userData }) => {
  const [query, setQuery] = useState();

  const PushBack = () => {
    const message = {
      type: "navigation",
      data: "/account",
    };

    window.parent.postMessage(JSON.stringify(message), "*");
  };

  return (
    <div className="sideBar col-md-3 bg-white pt-3">
      <div className="float-start">
        <Button
          onClick={PushBack}
          className="shadow-lg border-0 bg-light me-3 px-2 text-center"
        >
          <MdArrowBackIos className="text-danger fs-6 ms-2" />
        </Button>
      </div>
      <div className="mx-2 mt-3 profile-picture">
        <div className="col-md-5 col-sm-8 col-6 mx-auto position-relative">
          <img
            className="w-100 mb-3 rounded-circle"
            src="https://dealsonopenbox.azureedge.net/static/images/user-md.png"
          />
          <div className="bg-white shadow rounded px-2 pb-1" role={"button"}>
            <MdOutlineFileUpload className="text-danger d-none fw-bold" />
          </div>
        </div>
        <p className="text-blue fw-bold fs-6 text-center">
          {userData?.name || "NA"}
        </p>
      </div>
      <div className="search-box d-flex align-items-center mx-2">
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="flex-grow-1"
        />
        <div role="button">
          <IoSearch />
        </div>
      </div>
      <p className="font-lg fw-bold ms-3 text-blue">Recent Chats</p>

      <div className="mt-4">
        {(query && chatList
          ? chatList.filter((s) => s.title.includes(query))
          : chatList
        )?.map((x, i) => (
          <Link key={i} href={"/chat/" + x.id}>
            <div
              key={i}
              className={`p-3 border-bottom border-light chat-list ${
                x.id === activeChatId ? "bg-light" : ""
              }`}
              role="button"
            >
              <div className="d-flex">
                <div className="col-2  mt-auto text-capitalize">
                  <img
                    className="rounded-circle w-100"
                    src="https://dealsonopenbox.azureedge.net/static/images/user-sm.png"
                  />
                </div>
                <div className="col-9 px-2">
                  <p className="fw-bold mb-0 font-lg text-dark  text-truncate">
                    {x.title}
                  </p>
                  <span className="font-sm">
                    {x.message?.content || "Waiting For Messages"}
                  </span>
                </div>
                <div className="col-1">
                  <span className="font-tiny">
                    {x.message?.data
                      ? moment(x.message?.date).format("hh:mm")
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {chatList ? null : (
        <div className="py-5">
          <ShrimerLoading />
          <ShrimerLoading />
        </div>
      )}
    </div>
  );
};

const ShrimerLoading = () => (
  <div className="py-4 rounded mb-3 mx-3 bg-light shimmer-animate" />
);

export default SideBar;
