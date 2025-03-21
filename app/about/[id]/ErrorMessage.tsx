import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card className="text-center p-8">
        <CardTitle className="mb-4 text-red-600 dark:text-red-400">Erreur</CardTitle>
        <CardDescription className="text-base">{message}</CardDescription>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}