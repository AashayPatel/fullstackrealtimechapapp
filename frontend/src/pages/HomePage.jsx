import { useChatStore } from "../store/useChatStore";

// import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar  from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
// import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>

  );
};
export default HomePage;