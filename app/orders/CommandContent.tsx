"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, Package, Search, ShoppingBag, Truck, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// Types pour les commandes
type OrderStatus = "en-attente" | "livré" | "annulé"

interface Order {
  id: string
  date: string
  products: string[]
  total: string
  status: OrderStatus
  trackingNumber?: string
}

export default function CommandesContent() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "CMD-2023-001",
      date: "15/03/2023",
      products: ["Bouquet Printanier", "Vase en céramique"],
      total: "59,90 €",
      status: "livré",
      trackingNumber: "TRK293847",
    },
    {
      id: "CMD-2023-002",
      date: "02/04/2023",
      products: ["Arrangement Élégance Rustique", "Carte personnalisée"],
      total: "45,50 €",
      status: "livré",
      trackingNumber: "TRK394857",
    },
    {
      id: "CMD-2023-003",
      date: "18/04/2023",
      products: ["Bouquet de Roses Rouges", "Chocolats assortis"],
      total: "72,00 €",
      status: "annulé",
    },
    {
      id: "CMD-2023-004",
      date: "05/05/2023",
      products: ["Composition Florale Exotique"],
      total: "68,90 €",
      status: "en-attente",
      trackingNumber: "TRK583920",
    },
    {
      id: "CMD-2023-005",
      date: "20/05/2023",
      products: ["Orchidée en Pot", "Engrais spécial orchidées"],
      total: "54,80 €",
      status: "en-attente",
      trackingNumber: "TRK673021",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("tous")
  const router = useRouter()
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "tous" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "livré":
        return "success"
      case "en-attente":
        return "warning"
      case "annulé":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "livré":
        return "Livré"
      case "en-attente":
        return "En attente"
      case "annulé":
        return "Annulé"
      default:
        return status
    }
  }

  // Fonction pour obtenir l'icône du statut
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "livré":
        return <Truck className="h-4 w-4 mr-1" />
      case "en-attente":
        return <Clock className="h-4 w-4 mr-1" />
      case "annulé":
        return <X className="h-4 w-4 mr-1" />
      default:
        return <Package className="h-4 w-4 mr-1" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
            <ArrowLeft onClick={() => router.back()} className="cursor-pointer mr-2"/>
            Mes Commandes
          </h1>
          <p className="text-emerald-700 dark:text-emerald-300">Suivez l'historique et l'état de vos commandes</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <ShoppingBag className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mr-2" />
          <div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">Total des commandes</p>
            <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200">{orders.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">En attente</CardTitle>
            <CardDescription>Commandes en cours de traitement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-amber-500 mr-3" />
              <span className="text-2xl font-bold">
                {orders.filter((order) => order.status === "en-attente").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Livrées</CardTitle>
            <CardDescription>Commandes livrées avec succès</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-emerald-500 mr-3" />
              <span className="text-2xl font-bold">{orders.filter((order) => order.status === "livré").length}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Annulées</CardTitle>
            <CardDescription>Commandes annulées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <X className="h-8 w-8 text-red-500 mr-3" />
              <span className="text-2xl font-bold">{orders.filter((order) => order.status === "annulé").length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Historique des commandes</CardTitle>
          <CardDescription>Consultez les détails de vos commandes passées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une commande..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="en-attente">En attente</SelectItem>
                <SelectItem value="livré">Livré</SelectItem>
                <SelectItem value="annulé">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Produits</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Aucune commande trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {order.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[250px]">
                          {order.products.map((product, index) => (
                            <span key={index} className="block truncate">
                              {product}
                              {index < order.products.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status) as any} className="flex w-fit items-center">
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

