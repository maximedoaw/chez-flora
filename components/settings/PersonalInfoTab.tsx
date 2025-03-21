"use client"

import { Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MapPin } from "lucide-react"
import { useSettings } from "./SettingsContext"

export function PersonalInfoTab() {
  const { profile, handleProfileChange, saveProfile, isSaving } = useSettings()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <Label>Adresse de livraison</Label>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address.street">Rue</Label>
              <Textarea
                id="address.street"
                name="address.street"
                value={profile.address.street}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.city">Ville</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={profile.address.city}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.postalCode">Code postal</Label>
                <Input
                  id="address.postalCode"
                  name="address.postalCode"
                  value={profile.address.postalCode}
                  onChange={handleProfileChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address.country">Pays</Label>
              <Input
                id="address.country"
                name="address.country"
                value={profile.address.country}
                onChange={handleProfileChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button className="flex items-center gap-2" onClick={saveProfile} disabled={isSaving}>
          <Save className="h-4 w-4" />
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </CardFooter>
    </Card>
  )
}

