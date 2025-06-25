import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messagesEndRef.current && messages?.length > 0) {
      const container = containerRef.current;
      const threshold = 100;
      const shouldScroll = container.scrollTop + container.clientHeight >= 
                         container.scrollHeight - threshold;

      if (shouldScroll) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
  <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
    <ChatHeader />

    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messages?.map((message) => {
        const isCurrentUser = message.senderId === authUser._id;
        return (
          <div
            key={message._id}
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
          >
            <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}>
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
                <img
                  src={
                    isCurrentUser
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Message + Time Container */}
              <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                {/* Message Bubble */}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                
                {/* Time - Now properly aligned under message */}
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>

    <MessageInput />
  </div>
);
};

export default ChatContainer;