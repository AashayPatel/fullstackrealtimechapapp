import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      isSkippingSetup: false,

      // Socket states (assuming you have socket integration)
      socket: null,
      isSocketConnected: false,

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data });
        } catch (error) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data, onSuccess) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success('Account created successfully!');
          
          if (onSuccess) onSuccess();
        } catch (error) {
          console.error('Signup error:', error);
          toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
          throw error; // Re-throw for handling in component
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data, onSuccess) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");

          get().connectSocket();
          if (onSuccess) onSuccess();
        } catch (error) {
          toast.error(error.response?.data?.message || 'Login failed');
          throw error;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      updateProfile: async (formData, onSuccess) => {
        set({ isUpdatingProfile: true });
        
        try {
          const res = await axiosInstance.put("/auth/update-profile", formData, {
            headers: {
              "Content-Type": formData instanceof FormData 
                ? "multipart/form-data" 
                : "application/json",
            },
          });
          
          set({ authUser: { ...get().authUser, ...res.data } });
          toast.success("Profile updated successfully");
          
          if (onSuccess) onSuccess();
          return res.data;
        } catch (error) {
          console.error("Profile update error:", error);
          
          if (error.response?.status === 401) {
            set({ authUser: null });
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error(error.response?.data?.message || "Failed to update profile");
          }
          throw error;
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      skipProfileSetup: async (onSuccess) => {
        set({ isSkippingSetup: true });
        try {
          await axiosInstance.post("/auth/skip-setup");
          set({ 
            authUser: { 
              ...get().authUser, 
              profileSetupCompleted: false 
            } 
          });
          if (onSuccess) onSuccess();
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to skip setup");
          throw error;
        } finally {
          set({ isSkippingSetup: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged Out Successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response?.data?.message || "Logout failed");
          throw error;
        }
      },

      // Socket methods (if you're using them)
      connectSocket: () => {
        // Your socket connection logic
        set({ isSocketConnected: true });
      },

      disconnectSocket: () => {
        // Your socket disconnection logic
        set({ isSocketConnected: false, socket: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        authUser: state.authUser 
      }),
    }
  )
);