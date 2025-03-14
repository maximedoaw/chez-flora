import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthModal } from "@/hook/useAuthModal"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react"
import { auth } from "@/firebase/firebase"
import { Loader } from "lucide-react"
import OAuthButton from "./OAuthButton"
import { FIREBASE_ERRORS } from "@/firebase/error"

const Login = () => {
  const {open,setOpen,setView} = useAuthModal()
  const [error, setError] = useState('')
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const [signInwithEmailAndPassword, user, loading, userError] = useSignInWithEmailAndPassword(auth);
  

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    event.preventDefault();

    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
      })
    )
    
  }

  const onChangeView  = (view: "login" | "register" | "resetpassword") => {
    setView(view)
  }
  
  const onSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signInwithEmailAndPassword(input.email, input.password)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Se connecter</DialogTitle>
          <DialogDescription>
            Connectez-vous avec votre compte
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-x-2 space-y-2">
          <OAuthButton/>
          <div className="grid flex-1 gap-2">
            <p className='text-red-500 text-sm font-bold text-center'>
                            {FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS] || error}
            </p>

            <Label htmlFor="link" className="sr-only">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              className='w-[300px]'
              name='email'
              value={input.email}
              onChange={onInputChange}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Mot de passe
            </Label>
            <Input
              type='password'
              placeholder="Mot de passe"
              className='w-[300px]'
              name='password'
              value={input.password}
              onChange={onInputChange}
            />


          </div>

          <Button 
            type="submit" 
            size="sm" 
            className="px-3 bg-blue-500 w-[300px]"
            onClick={onSubmit}
            disabled={loading}
          >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
          </Button>
          <div>
            <span className='text-[12px] text-gray-500  hover:underline cursor-pointer'
             onClick={() => onChangeView("register")}
            >Pas encore de compte?</span>
            <span 
              className='text-[12px] text-gray-500 hover:underline cursor-pointer'
              onClick={() => onChangeView("resetpassword")}
            > ou mot de passe oublié</span>
         </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default Login