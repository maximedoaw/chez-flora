import { db } from "@/firebase/firebase";
import { Flower } from "@/types/Flower";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const FLOWER_DATA = [
    {
      id: '1',
      title: 'Magnifique Rose Rouge',
      slug: 'magnifique-rose-rouge',
      imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94',
      description: 'Une superbe rose rouge en pleine floraison, illustrant la symétrie parfaite de la nature.',
      author: 'Emma Wilson',
      views: 45678,
      postedAt: 'Il y a 2 jours',
      price: 5000
    },
    {
      id: '2',
      title: 'Champ de Lavande Pourpre',
      slug: 'champ-de-lavande-pourpre',
      imageUrl: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551',
      description: 'D’innombrables rangées de lavande parfumée s’étendant jusqu’à l’horizon.',
      author: 'Thomas Clark',
      views: 32456,
      postedAt: 'Il y a 3 jours',
      price: 7000
    },
    {
      id: '3',
      title: 'Splendeur du Tournesol',
      slug: 'splendeur-du-tournesol',
      imageUrl: 'https://images.unsplash.com/photo-1551445523-324a0fdab051',
      description: 'Des tournesols jaunes éclatants s’élevant vers le ciel d’été.',
      author: 'Sarah Johnson',
      views: 28934,
      postedAt: 'Il y a 1 jour',
      price: 4500
    },
    {
      id: '4',
      title: 'Fleurs de Cerisier',
      slug: 'fleurs-de-cerisier',
      imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951',
      description: 'Délicates fleurs de cerisier roses annonçant l’arrivée du printemps.',
      author: 'Yuki Tanaka',
      views: 67123,
      postedAt: 'Il y a 4 jours',
      price: 8000
    },
    {
      id: '5',
      title: 'Étang aux Nénuphars',
      slug: 'etang-aux-nenuphars',
      imageUrl: 'https://images.unsplash.com/photo-1474557157379-8aa74a6ef541',
      description: 'Un nénuphar serein flottant à la surface d’un étang paisible.',
      author: 'David Lee',
      views: 54321,
      postedAt: 'Il y a 1 semaine',
      price: 6000
    }
  ];
  
  export const useGetFlower = () => {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [loading, setLoading] = useState(true);
  
    // Fonction pour ajouter les fleurs à Firestore
    const uploadFlowers = useCallback(async () => {
      try {
        const flowerCollectionRef = collection(db, "flowers");
        const flowerSnapshot = await getDocs(flowerCollectionRef);
      
        if (!flowerSnapshot.empty) {
          const flowers = flowerSnapshot.docs.map(doc => doc.data());
          console.log("✅ Fleurs récupérées avec succès:", flowers);
        } else {
          console.log("❌ Aucune fleur trouvée dans la collection.");
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des fleurs:", error);
      }
    }, []);
  
    // Fonction pour récupérer les fleurs depuis Firestore
    const fetchFlowers = useCallback(async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "flowers"));
        const flowerList: Flower[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Flower[];
        setFlowers(flowerList);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des fleurs:", error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    // Exécuter `uploadFlowers` et `fetchFlowers` au montage
    useEffect(() => {
      uploadFlowers().then(fetchFlowers);
    }, [uploadFlowers, fetchFlowers]);
  
    return { flowers, loading };
  };
  
  // Exécuter la fonction