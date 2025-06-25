import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
              type="button"
              aria-label="Remove image"
            >
              <X className="w-3 h-3 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Message input"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full ${imagePreview ? "text-emerald-500" : "text-gray-500 dark:text-gray-400"} hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image className="w-5 h-5" />
          </button>
        </div>
        <button
          type="submit"
          className={`flex items-center justify-center w-10 h-10 rounded-full ${(!text.trim() && !imagePreview) ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500" : "bg-blue-500 hover:bg-blue-600 text-white"} transition-colors`}
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;