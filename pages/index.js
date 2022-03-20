import ChatLayout from "../components/layouts/ChatLayout";
import MainContent from "../components/mainContent";

const Index = () => {
  return (
    <>
      <ChatLayout>
        <MainContent>
          <div className="row m-5 h-100 align-items-center">
            <div className="col-md-6">
              <h1 className="fs-3 fw-bolder mb-4 text-dark text-center">
                Just A Click Away To Make Connection With New People
              </h1>
              <p className="text-center px-4 ">
                Select from the recent chats in the sidebar to chat with them
              </p>
            </div>
            <div className="col-md-6">
              <img
                className="w-100"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/no-message-3025708-2526906.png"
              />
            </div>
            <div className="col-md-5 my-5 mx-auto"></div>
          </div>
        </MainContent>
      </ChatLayout>
    </>
  );
};
export default Index;
