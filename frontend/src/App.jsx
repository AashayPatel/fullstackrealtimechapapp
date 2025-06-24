import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import PersonalInfoPage from "./pages/PersonalInfoPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { Hatch } from 'ldrs/react'
import 'ldrs/react/Hatch.css'
import ChatLoader from "./components/ChatLoader"
import { Toaster } from "react-hot-toast"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  // Show loading spinner while checking auth
  // console.log("authUser:", authUser, "isCheckingAuth:", isCheckingAuth);

  if (isCheckingAuth && !authUser) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <ChatLoader />
    </div>
  )
}


  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/info" />}/>
        <Route path="/info" element={authUser ? <PersonalInfoPage/> : <Navigate to="/login" />}/>
        {/* <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />}/> */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={authUser ? <SettingsPage/> : <Navigate to="/login" />}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" />}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App  