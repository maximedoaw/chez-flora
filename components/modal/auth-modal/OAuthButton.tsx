import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebase";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButton= () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  
    return (
      <div className="flex flex-col space-y-3 w-[300px]">
        <Button
          className="flex items-center justify-center rounded-full hover:bg-gray-100 "
          onClick={() => signInWithGoogle()}
          disabled={loading}
          variant={"outline"}
        >
          {loading ? (
            <Loader className="animate-spin text-gray-600 mr-2" size={20} />
          ) : (
            <Image src="/googlelogo.png" alt="Google" width={20} height={20} className="mr-2" />
          )}
          Google
        </Button>
  
  
        <div className="flex items-center justify-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500">ou</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
    );
  };
  
  export default OAuthButton;