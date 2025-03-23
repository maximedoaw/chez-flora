





 import React, { useRef, useState, FormEvent, ChangeEvent } from "react";
 import emailjs from "@emailjs/browser";
 import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Button } from "@/components/ui/button";
 
 const Contact = () => {
   const formRef = useRef<HTMLFormElement>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [form, setForm] = useState({
     name: '',
     email: '',
     message: ''
   });
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
 
   const whatsappLink = "https://wa.me/1234567890"; // Lien WhatsApp par défaut
 
   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setForm({
       ...form,
       [name]: value
     });
   };
 
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setLoading(true);
     setSuccessMessage(null);
     setErrorMessage(null);
 
     // Validation simple
     if (!form.name || !form.email || !form.message) {
       setErrorMessage("Please fill in all fields.");
       setLoading(false);
       return;
     }
 
     try {
       // Initialisation d'EmailJS avec votre clé publique
       emailjs.init("J6gUA7BQzKH_cMk7P");
 
       await emailjs.send(
      'service_t1amq6r',
      'template_j1nft3x',
         {
           from_name: form.name,
           to_name: 'Maxime Doaw',
           from_email: form.email,
           to_email: 'maximedoaw204@gmail.com', // Assurez-vous que l'e-mail est correct
           message: form.message
         }
       );
 
       setLoading(false);
       setSuccessMessage("Your message has been sent successfully!");
 
       // Réinitialisation du formulaire
       setForm({
         name: '',
         email: '',
         message: ''
       });
     } catch (error) {
       console.error("Failed to send the message:", error);
       setLoading(false);
       setErrorMessage("Failed to send the message. Please try again later.");
     }
   };
 
   return (
     <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 py-16 px-6 lg:px-20">
       <div className="max-w-4xl mx-auto text-center">
         <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-emerald-800 dark:text-emerald-300">Contactez-nous</h2>
         <p className="text-emerald-700 dark:text-emerald-400 mb-8">
           Vous avez des questions ou souhaitez en savoir plus ? Contactez-nous dès aujourd'hui pour discuter de vos
           besoins.
         </p>
 
         <div className="space-y-6">
           <Card className="bg-white/80 dark:bg-gray-800/50 border-emerald-100 dark:border-emerald-900 shadow-md">
             <CardContent className="pt-6">
               <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <Input
                     type="text"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     placeholder="Votre nom"
                     required
                     className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                   />
                 </div>
                 <div>
                   <Input
                     type="email"
                     name="email"
                     value={form.email}
                     onChange={handleChange}
                     placeholder="Votre email"
                     required
                     className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                   />
                 </div>
                 <div>
                   <Textarea
                     name="message"
                     value={form.message}
                     onChange={handleChange}
                     placeholder="Votre message"
                     rows={4}
                     required
                     className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                   />
                 </div>
                 <Button
                   type="submit"
                   disabled={loading}
                   className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold py-6"
                 >
                   {loading ? (
                     <span className="flex items-center justify-center">
                       <svg
                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                       >
                         <circle
                           className="opacity-25"
                           cx="12"
                           cy="12"
                           r="10"
                           stroke="currentColor"
                           strokeWidth="4"
                         ></circle>
                         <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                         ></path>
                       </svg>
                       Envoi en cours...
                     </span>
                   ) : (
                     <span className="flex items-center justify-center">
                       Envoyer <Send className="ml-2 h-4 w-4" />
                     </span>
                   )}
                 </Button>
               </form>
 
               {successMessage && (
                 <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-md">
                   {successMessage}
                 </div>
               )}
 
               {errorMessage && (
                 <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-md">
                   {errorMessage}
                 </div>
               )}
             </CardContent>
           </Card>
 
           <Card className="bg-white/80 dark:bg-gray-800/50 border-emerald-100 dark:border-emerald-900 shadow-md">
             <CardContent className="pt-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                 <div className="flex flex-col items-center md:items-start">
                   <div className="flex items-center mb-2">
                     <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                     <span className="font-medium text-emerald-800 dark:text-emerald-300">Email</span>
                   </div>
                   <a
                     href="mailto:contact@entreprise.com"
                     className="text-emerald-600 dark:text-emerald-400 hover:underline"
                   >
                     contact@entreprise.com
                   </a>
                 </div>
 
                 <div className="flex flex-col items-center md:items-start">
                   <div className="flex items-center mb-2">
                     <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                     <span className="font-medium text-emerald-800 dark:text-emerald-300">Téléphone</span>
                   </div>
                   <a href="tel:+1234567890" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                     +1 234 567 890
                   </a>
                 </div>
 
                 <div className="flex flex-col items-center md:items-start">
                   <div className="flex items-center mb-2">
                     <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                     <span className="font-medium text-emerald-800 dark:text-emerald-300">Adresse</span>
                   </div>
                   <p className="text-emerald-600 dark:text-emerald-400">123 Rue de l'Exemple, Ville, Pays</p>
                 </div>
               </div>
             </CardContent>
           </Card>
 
           <div className="mt-8 flex justify-center gap-6">
             <a
               href="https://facebook.com"
               target="_blank"
               rel="noopener noreferrer"
               className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
               aria-label="Facebook"
             >
               <Facebook className="h-6 w-6" />
             </a>
             <a
               href="https://twitter.com"
               target="_blank"
               rel="noopener noreferrer"
               className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
               aria-label="Twitter"
             >
               <Twitter className="h-6 w-6" />
             </a>
             <a
               href="https://instagram.com"
               target="_blank"
               rel="noopener noreferrer"
               className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
               aria-label="Instagram"
             >
               <Instagram className="h-6 w-6" />
             </a>
           </div>
         </div>
 
         <a
           href={whatsappLink}
           target="_blank"
           rel="noopener noreferrer"
           className="inline-block mt-10 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
         >
           Réserver une consultation
         </a>
       </div>
     </section>
   );
 };
 
 export default Contact;