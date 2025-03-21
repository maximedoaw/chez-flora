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
import { Switch } from "@/components/ui/switch"
import { MapPin, Bell } from 'lucide-react'
import { UserProfile } from "../types"

interface AddEditUserDialogProps {
  isOpen: boolean
  isEdit: boolean
  formData: Partial<UserProfile>
  onClose: () => void
  onSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onNotificationChange: (key: string) => void
}

export default function AddEditUserDialog({
  isOpen,
  isEdit,
  formData,
  onClose,
  onSubmit,
  onChange,
  onNotificationChange
}: AddEditUserDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} User</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? "Modify the information of the selected user."
              : "Fill in the information to add a new user."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={onChange}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={onChange}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={onChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={onChange}
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Address
            </Label>
            <div className="space-y-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="address.street">Street</Label>
                <Textarea
                  id="address.street"
                  name="address.street"
                  value={formData.address?.street || ""}
                  onChange={onChange}
                  placeholder="123 Main St"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.city">City</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    value={formData.address?.city || ""}
                    onChange={onChange}
                    placeholder="Paris"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.postalCode">Postal Code</Label>
                  <Input
                    id="address.postalCode"
                    name="address.postalCode"
                    value={formData.address?.postalCode || ""}
                    onChange={onChange}
                    placeholder="75001"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={formData.address?.country || ""}
                  onChange={onChange}
                  placeholder="France"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notification Preferences
            </Label>
            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications.email" className="cursor-pointer">
                  Email Notifications
                </Label>
                <Switch
                  id="notifications.email"
                  checked={formData.notifications?.email || false}
                  onCheckedChange={() => onNotificationChange("email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications.promotions" className="cursor-pointer">
                  Promotions and Offers
                </Label>
                <Switch
                  id="notifications.promotions"
                  checked={formData.notifications?.promotions || false}
                  onCheckedChange={() => onNotificationChange("promotions")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications.orderUpdates" className="cursor-pointer">
                  Order Updates
                </Label>
                <Switch
                  id="notifications.orderUpdates"
                  checked={formData.notifications?.orderUpdates || false}
                  onCheckedChange={() => onNotificationChange("orderUpdates")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications.newsletter" className="cursor-pointer">
                  Newsletter
                </Label>
                <Switch
                  id="notifications.newsletter"
                  checked={formData.notifications?.newsletter || false}
                  onCheckedChange={() => onNotificationChange("newsletter")}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={formData.status || ""}
                onChange={onChange}
                placeholder="Client"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ordersCount">Orders Count</Label>
              <Input
                id="ordersCount"
                name="ordersCount"
                type="number"
                value={formData.ordersCount || ""}
                onChange={onChange}
                placeholder="0"
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
