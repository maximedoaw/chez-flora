"use client"

import { CardFooter } from "@/components/ui/card"

import { Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useSettings } from "./SettingsContext"

export function NotificationsTab() {
  const { profile, handleNotificationChange, saveProfile, isSaving } = useSettings()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notification</CardTitle>
        <CardDescription>Choisissez comment vous souhaitez être informé</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={profile.notifications.email}
              onCheckedChange={() => handleNotificationChange("email")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="promotions">Promotions et offres</Label>
              <p className="text-sm text-muted-foreground">Recevoir des offres spéciales et promotions</p>
            </div>
            <Switch
              id="promotions"
              checked={profile.notifications.promotions}
              onCheckedChange={() => handleNotificationChange("promotions")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="order-updates">Mises à jour des commandes</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications sur l'état de vos commandes</p>
            </div>
            <Switch
              id="order-updates"
              checked={profile.notifications.orderUpdates}
              onCheckedChange={() => handleNotificationChange("orderUpdates")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter">Newsletter</Label>
              <p className="text-sm text-muted-foreground">Recevoir notre newsletter mensuelle</p>
            </div>
            <Switch
              id="newsletter"
              checked={profile.notifications.newsletter}
              onCheckedChange={() => handleNotificationChange("newsletter")}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Réinitialiser</Button>
        <Button className="flex items-center gap-2" onClick={saveProfile} disabled={isSaving}>
          <Save className="h-4 w-4" />
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </CardFooter>
    </Card>
  )
}

