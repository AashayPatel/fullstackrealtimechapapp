import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white/95 text-gray-900 dark:bg-gray-800/80 dark:text-white backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          
          {/* Left Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors">
                  <img 
                    src="/logo.svg" 
                    alt="Logo" 
                  />
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Shup</h1>
            </Link>
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* <Link
              to="/settings"
              className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link> */}

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-300 dark:border-gray-600"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-600 dark:text-white dark:hover:bg-red-700 transition-colors flex items-center gap-2 border border-red-300 dark:border-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;