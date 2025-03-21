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
import { FlowerType } from "../types"

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
            <Label htmlFor="imageUrl">Image URL *</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={onChange}
              placeholder="https://example.com/image.jpg"
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
          <Button onClick={onSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            {isEdit ? "Save Changes" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
