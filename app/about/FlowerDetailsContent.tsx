"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { Flower } from "@/types/Flower";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMessage from "./ErrorMessage";
import { useAuthState } from "react-firebase-hooks/auth";
// Statuts possibles pour une commande
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

// Interface pour la commande
interface Order {
  id?: string;
  date: string;
  products: string[];
  total: string;
  status: OrderStatus;
  trackingNumber?: string;
}


export default function FlowerDetailsContent({ id }: { id: string }) {
  const [flower, setFlower] = useState<Flower | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const fetchFlower = async () => {
      try {
        setLoading(true);
        const flowerRef = doc(db, "flowers", id as string);
        const flowerDoc = await getDoc(flowerRef);
        if (flowerDoc.exists()) {
          setFlower({ id: flowerDoc.id, ...flowerDoc.data() } as Flower);
        } else {
          setError("Fleur introuvable." + `${id}`);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des détails de la fleur:", err);
        setError("Impossible de charger les détails de cette fleur. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlower();
    }
  }, [id]);

const addToCart = async () => {
  if (!flower) return;

  try {
    const userId = user?.uid; 

    // Référence à la sous-collection `orders/${userId}/userOrders`
    const ordersCollectionRef = collection(db, "orders", userId as string, "userOrders");

    // Données de la commande
    const orderData: Order = {
      date: new Date().toLocaleDateString("fr-FR"),
      products: [flower.title], 
      total: `${flower.price} FCFA`, 
      status: "delivered", 
    };

    // Ajouter la commande à Firestore
    const docRef = await addDoc(ordersCollectionRef, orderData);
    console.log("✅ Commande ajoutée avec succès ! ID du document :", docRef.id);

  } catch (error) {
    console.error("❌ Erreur lors de l'ajout au panier:", error);
    alert("Une erreur s'est produite. Veuillez réessayer.");
  }
};

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !flower) {
    return <ErrorMessage message={error || "Fleur introuvable. Veuillez vérifier l'identifiant et réessayer."} />;
  }

  return (
    <div className="container mx-auto py-5 px-4 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Link>
      </Button>

      <Card className="overflow-hidden dark:border-gray-700 shadow-lg">
        <div className="relative h-[400px] w-full">
          <Image
            src={flower?.imageUrl || "/placeholder.svg?height=400&width=800"}
            alt={flower?.title || ""}
            fill
            className="object-cover"
            priority
            blurDataURL="/data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium text-sm px-3 py-1">
              {flower?.price} FCFA
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-3xl font-serif text-emerald-800 dark:text-emerald-200">{flower?.title}</CardTitle>
          <div className="flex flex-wrap gap-4 text-sm text-emerald-600 dark:text-emerald-400">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {flower?.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {flower?.postedAt}
            </div>
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {flower?.views} vues
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-emerald dark:prose-invert max-w-none">
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed whitespace-pre-line">
              {flower?.description}
            </p>
          </div>
        </CardContent>

        <Separator className="mx-6 bg-emerald-100 dark:bg-emerald-800/50" />

        <CardFooter className="flex justify-between items-center py-6">
          <div className="text-sm text-emerald-600 dark:text-emerald-400">Référence: {flower?.id}</div>
          <Link href={flower.payementLink || ""}>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={addToCart} // Appeler la fonction addToCart au clic
            >
              Ajouter au panier
            </Button>
          </Link>

        </CardFooter>
      </Card>
    </div>
  );
}