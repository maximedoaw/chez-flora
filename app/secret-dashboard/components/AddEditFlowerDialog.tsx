"use client"

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { db, storage } from "@/firebase/firebase"

export type FlowerType = {
  id: string
  slug: string
  title: string
  imageUrl: string
  description: string
  author: string
  views: number
  postedAt: string
  price: number
  createdAt?: any
  updatedAt?: any
}


interface AddEditFlowerDialogProps {
  isOpen: boolean
  isEdit: boolean
  formData: Partial<FlowerType>
  onClose: () => void
  onSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function AddEditFlowerDialog({
  isOpen,
  isEdit,
  formData,
  onClose,
  onSubmit,
  onChange
}: AddEditFlowerDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = async () => {
    if (imageFile) {
      try {
        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, `flowers/${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        // Wait for the file upload to complete
        uploadTask.on(
          "state_changed",
          snapshot => {
            // You can monitor upload progress here if needed
          },
          error => {
            console.error("Error uploading image:", error)
          },
          async () => {
            // Once upload is complete, get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

            // Include the download URL in the form data
            formData.imageUrl = downloadURL

            // Now, handle the actual save to Firestore
            const flowerRef = doc(db, "flowers", formData.id || "") // Adjust based on your needs
            await setDoc(flowerRef, formData, { merge: true })

            // After submission, call the onSubmit callback
            onSubmit()
            onClose()
          }
        )
      } catch (error) {
        console.error("Error uploading flower data:", error)
      }
    }
  }

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
              <Label htmlFor="price">Price (€)</Label>
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            {isEdit ? "Save Changes" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
