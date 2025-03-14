"use client"

import { useAuthModal } from "@/hook/useAuthModal"
import Login from "./Login"
import SignUp from "./SignUp"
import ResetPassword from "./ResetPassword"

const AuthModal = () => {
  
  const {view} = useAuthModal()
  return (
    <>
      {view === "login" && <Login />}
      {view === "register" && <SignUp />}
      {view === "resetpassword" && <ResetPassword />}
    </>
  )
}

export default AuthModal