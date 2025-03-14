"use client"

import Image from "next/image"
import AuthModal from "@/components/modal/auth-modal/AuthModal"
import { Button } from "@/components/ui/button"
import { useAuthModal } from "@/hook/useAuthModal"


export default function HeroSection() {
  
  const {open, setOpen, setView} = useAuthModal()
  const handleOpenAndView = (view: "login" | "register" | "resetpassword") => {
    setOpen(!open)
    setView(view)
  }

  return (
    <section className="w-full h-screen bg-gradient-to-r  flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 h-full">
          <div className="flex-1 relative rounded-2xl overflow-hidden h-[70vh] md:h-[80vh]">
            <Image
              src="/flowers/f6.jpeg"
              width={800}
              height={600}
              alt="Arrangement floral élégant"
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-white font-serif text-3xl md:text-4xl mb-2 drop-shadow-md">Beauté naturelle</h2>
              <p className="text-white/90 max-w-md text-lg drop-shadow-md">
                Des arrangements floraux qui capturent l'essence de la nature
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-emerald-900 mb-4">
                Fleurs fraîches, <span className="text-rose-600">émotions sincères</span>
              </h1>
              <p className="text-emerald-800 text-lg mb-8">
                Découvrez notre collection de bouquets artisanaux et d'arrangements floraux, soigneusement composés pour
                apporter couleur et joie dans votre quotidien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <Button
                  className="px-6 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-colors text-center"
                  onClick={() => handleOpenAndView("login")}
              >
                  Se connecter
              </Button>                
              <Button
                className="px-6 py-3 border-2 border-emerald-700 text-emerald-700 rounded-full font-medium
                  hover:bg-emerald-50 transition-colors text-center"
                  variant={"outline"}
                  onClick={() => handleOpenAndView("register")}
              >
                  S'inscrire
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal/>
    </section>
  )
}

