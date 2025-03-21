"use client"

import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function RotatingLoader() {
  return (
<div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce"></div>
  <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
  );
}

export default function Home() {
  
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <RotatingLoader />
      </div>
    );
  }

  return user ? <HomeScreen /> : <AuthScreen />;
}
