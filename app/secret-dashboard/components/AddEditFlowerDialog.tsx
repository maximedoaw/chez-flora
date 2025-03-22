"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { v4 as uuidv4 } from "uuid"; // Pour générer des IDs uniques

export type FlowerType = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  author: string;
  views: number;
  postedAt: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

interface AddEditFlowerDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  formData: Partial<FlowerType>;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AddEditFlowerDialog({
  isOpen,
  isEdit,
  formData,
  onClose,
  onSubmit,
  onChange
}: AddEditFlowerDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour gérer l'état de soumission

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !imageFile) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Générer un nouvel ID si c'est une nouvelle fleur
      const flowerId = isEdit && formData.id ? formData.id : uuidv4();

      // Téléverser l'image dans Firebase Storage
      const storageRef = ref(storage, `flowers/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading image:", error);
          setIsSubmitting(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Mettre à jour les données de la fleur avec l'URL de l'image
          const flowerData = {
            ...formData,
            id: flowerId,
            imageUrl: downloadURL,
            createdAt: isEdit ? formData.createdAt : new Date(),
            updatedAt: new Date(),
          };

          // Référence du document Firestore
          const flowerRef = doc(db, "flowers", flowerId);

          // Enregistrer ou mettre à jour le document dans Firestore
          await setDoc(flowerRef, flowerData, { merge: true });

          // Appeler la fonction de soumission et fermer le dialogue
          onSubmit();
          onClose();
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      console.error("Error uploading flower data:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Flower</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? "Modify the information of the selected flower."
              : "Fill in the information to add a new flower."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={onChange}
                placeholder="Red Rose"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug || ""}
                onChange={onChange}
                placeholder="red-rose"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image *</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="file"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={onChange}
              placeholder="Detailed description of the flower..."
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author || ""}
                onChange={onChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (frcfa)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={onChange}
                placeholder="9.99"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (isEdit ? "Save Changes" : "Add")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}