import { Flower2, Gift, Heart, Truck, Calendar, Store } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: <Flower2 className="w-8 h-8" />,
      title: "Compositions Sur Mesure",
      description: "Créations florales uniques adaptées à vos goûts et occasions spéciales",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Abonnement Floral",
      description: "Recevez des fleurs fraîches à intervalles réguliers pour égayer votre intérieur",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Événements Spéciaux",
      description: "Décorations florales pour mariages, cérémonies et événements d'entreprise",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Livraison Express",
      description: "Service de livraison rapide et soigné dans toute la ville",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Cadeaux Floraux",
      description: "Offrez des moments de bonheur avec nos compositions cadeau",
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "Conseil Personnalisé",
      description: "Expertise florale pour vous guider dans vos choix",
    },
  ]

  return (
    <section className="w-full bg-gradient-to-b py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-emerald-900 mb-4">Nos Services</h2>
          <p className="text-emerald-800/80 max-w-2xl mx-auto text-lg">
            Découvrez notre gamme complète de services floraux, conçus pour répondre à tous vos besoins et occasions
            spéciales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow 
                        border  flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="mb-4 text-emerald-600 group-hover:text-rose-600 transition-colors">{service.icon}</div>
              <h3 className="text-xl font-serif text-emerald-900 mb-2">{service.title}</h3>
              <p className="text-emerald-800/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

