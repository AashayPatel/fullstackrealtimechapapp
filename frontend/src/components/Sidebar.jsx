import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onlineUsers = users?.filter(user => user.staatus === "online") || [];

  const filteredUsers = showOnlineOnly
    ? onlineUsers
    : users;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-200 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 w-full p-5">
        <div className="flex items-center gap-2 text-gray-800 dark:text-white">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Online Only Toggle */}

      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        <div className="mt-3 hidden lg:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className={`
                    appearance-none h-3.5 w-3.5 border border-gray-400 dark:border-gray-600 
                    rounded-sm bg-white dark:bg-gray-800 cursor-pointer
                    checked:bg-blue-600 dark:checked:bg-blue-500 checked:border-transparent 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 
                    transition-all duration-200
                    relative
                    before:content-['✓'] before:text-[10px] before:absolute before:inset-0 before:flex before:items-center before:justify-center
                    before:text-white dark:before:text-white before:opacity-0 checked:before:opacity-100
                `}
                />
                <span>
                Show Online Only <span className="text-xs text-gray-400">({onlineUsers.length})</span>
                </span>
            </label>
        </div>

        {filteredUsers?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
              ${selectedUser?._id === user._id ? "bg-gray-100 dark:bg-gray-800 ring-1 ring-blue-500" : ""}
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              {user.staatus === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
              {user.staatus === "offline" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
              {user.staatus === "away" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
              {user.staatus === "busy" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-gray-900 dark:text-white truncate">{user.fullName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.staatus}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers?.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
