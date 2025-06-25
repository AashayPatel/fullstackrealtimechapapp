import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userID) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userID}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            set((state) => ({
            messages: [...state.messages, newMessage],
            }));
        });
    },



    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return; 
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),
}));