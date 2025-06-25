import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gray-200 dark:bg-gray-800">
        <div className="max-w-md text-center space-y-6">
            {/* Icon Display */}
            <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
                <div
                className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center
                justify-center animate-bounce"
                >
                <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
            </div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Shup!</h2>
            <p className="text-gray-600 dark:text-gray-300">
            Select User to Start Chatting
            </p>
        </div>
    </div>

  );
};

export default NoChatSelected;