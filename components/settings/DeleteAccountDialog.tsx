"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSettings } from "./SettingsContext"

export function DeleteAccountDialog() {
  const { currentPassword, setCurrentPassword, isDeleting, deleteAccount } = useSettings()

  return (
<DialogContent>
      <DialogHeader>
        <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Supprimer votre compte
        </DialogTitle>
        <DialogDescription>
          Cette action est irréversible. Toutes vos données personnelles seront définitivement supprimées.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            La suppression de votre compte entraînera la perte de votre historique de commandes et de vos préférences.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="delete-password">Entrez votre mot de passe pour confirmer</Label>
          <Input
            id="delete-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Votre mot de passe actuel"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" className="mr-auto">
          Annuler
        </Button>
        <Button variant="destructive" onClick={deleteAccount} disabled={isDeleting || !currentPassword}>
          {isDeleting ? "Suppression..." : "Supprimer définitivement"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

