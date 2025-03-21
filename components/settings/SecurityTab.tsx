"use client"

import { Key, Mail, Save, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSettings } from "./SettingsContext"

export function SecurityTab() {
  const {
    currentPassword,
    setCurrentPassword,
    newEmail,
    setNewEmail,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isChangingEmail,
    isChangingPassword,
    changeEmail,
    changePassword,
  } = useSettings()

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Adresse email</CardTitle>
          <CardDescription>Modifiez l'adresse email associée à votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Nouvelle adresse email</Label>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-password-email">Mot de passe actuel</Label>
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Input
                id="current-password-email"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Pour des raisons de sécurité, veuillez entrer votre mot de passe actuel pour confirmer ce changement.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className="flex items-center gap-2"
            onClick={changeEmail}
            disabled={isChangingEmail || !newEmail || !currentPassword}
          >
            <Save className="h-4 w-4" />
            {isChangingEmail ? "Mise à jour..." : "Mettre à jour l'email"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mot de passe</CardTitle>
          <CardDescription>Changez votre mot de passe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>Les mots de passe ne correspondent pas.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className="flex items-center gap-2"
            onClick={changePassword}
            disabled={
              isChangingPassword ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
          >
            <Save className="h-4 w-4" />
            {isChangingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

