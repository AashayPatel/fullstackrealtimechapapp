import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-10 h-10">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User info */}
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-white">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedUser.staatus}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
