"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash, Eye, ImageIcon } from "lucide-react"
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

interface FlowersTableProps {
  flowers: FlowerType[]
  loading: boolean
  onAdd: () => void
  onEdit: (flower: FlowerType) => void
  onDelete: (flower: FlowerType) => void
}

export default function FlowersTable({ flowers, loading, onAdd, onEdit, onDelete }: FlowersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFlowers = flowers.filter(
    (flower) =>
      flower.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flower.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flower.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Flower Management</CardTitle>
            <CardDescription>Manage your flower catalog, add new products or modify existing ones.</CardDescription>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Flower
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search flowers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredFlowers.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="mt-4 text-lg font-medium">No flowers found</p>
            <p className="text-muted-foreground">
              {searchTerm ? "Try with another search term." : "Start by adding a flower to the catalog."}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlowers.map((flower) => (
                  <TableRow key={flower.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {flower.imageUrl ? (
                          <img
                            src={flower.imageUrl || "/placeholder.svg"}
                            alt={flower.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{flower.title}</TableCell>
                    <TableCell>{typeof flower.price === "number" ? flower.price.toFixed(2) : flower.price} frcfa</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                        {flower.views}
                      </div>
                    </TableCell>
                    <TableCell>{flower.author}</TableCell>
                    <TableCell>{flower.postedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onEdit(flower)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(flower)} className="text-red-600 dark:text-red-400">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

