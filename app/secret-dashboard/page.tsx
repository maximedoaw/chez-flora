"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { Flower, Users, BookOpen } from "lucide-react"

import DashboardHeader from "./components/DashboardHeader"
import StatsComponent from "./components/DashboardStats"
import FlowersTable from "./components/FlowersTable"
import UsersTable from "./components/UsersTable"
import BlogTable from "./components/BlogTable"
import AddEditFlowerDialog from "./components/AddEditFlowerDialog"
import AddEditUserDialog from "./components/AddEditUserDialog"
import AddEditPostDialog from "./components/AddEditPostDialog"
import DeleteConfirmDialog from "./components/DeleteConfirmDialog"
import { auth, db } from "@/firebase/firebase"

// Types pour les données
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

export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  notifications: {
    email: boolean
    promotions: boolean
    orderUpdates: boolean
    newsletter: boolean
  }
  memberSince: string
  ordersCount: number
  status: string
}

export type Post = {
  id: number | string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  commentCount: number
}

export type DashboardStats = {
  flowers: number
  users: number
  posts: number
  totalViews: number
}



export default function Dashboard() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes, set to true
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false)

  // Data states
  const [flowers, setFlowers] = useState<FlowerType[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    flowers: 0,
    users: 0,
    posts: 0,
    totalViews: 0,
  })

  // UI states
  const [dataLoading, setDataLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("flowers")

  // CRUD states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setDataLoading(true)

        // Fetch flowers
        const flowersSnapshot = await getDocs(collection(db, "flowers"))
        const flowersData = flowersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FlowerType[]
        setFlowers(flowersData)

        // Fetch users
        const usersSnapshot = await getDocs(collection(db, "users"))
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserProfile[]
        setUsers(usersData)

        // Fetch blog posts
        const postsSnapshot = await getDocs(collection(db, "blog_posts"))
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[]
        setPosts(postsData)

        // Set stats
        setStats({
          flowers: flowersData.length,
          users: usersData.length,
          posts: postsData.length,
          totalViews: flowersData.reduce((sum, flower) => sum + (flower.views || 0), 0),
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setDataLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev : any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev : any) => ({
        ...prev,
        [name]:
          name === "price" || name === "views" || name === "ordersCount" || name === "commentCount"
            ? Number(value)
            : value,
      }))
    }
  }

  // Handle notification toggle
  const handleNotificationChange = (key: string) => {
    setFormData((prev : any) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications?.[key],
      },
    }))
  }

  // Reset form data
  const resetForm = () => {
    setFormData({})
    setCurrentItem(null)
  }

  // CRUD operations for flowers
  const addFlower = async () => {
    try {
      if (!formData.title || !formData.slug) {
        alert("Please fill in all required fields")
        return
      }

      const newFlower = {
        ...formData,
        views: formData.views || 0,
        postedAt: formData.postedAt || new Date().toLocaleDateString("fr-FR"),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "flowers"), newFlower)

      setFlowers((prev) => [...prev, { ...newFlower, id: docRef.id }])
      setIsAddDialogOpen(false)
      resetForm()

      // Update stats
      setStats((prev) => ({
        ...prev,
        flowers: prev.flowers + 1,
      }))
    } catch (error) {
      console.error("Error adding flower:", error)
      alert("Failed to add flower")
    }
  }

  const updateFlower = async () => {
    try {
      if (!currentItem || !formData.title) {
        alert("Invalid data for update")
        return
      }

      const updatedFlower = {
        ...currentItem,
        ...formData,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(doc(db, "flowers", currentItem.id), updatedFlower)

      setFlowers((prev) => prev.map((flower) => (flower.id === currentItem.id ? updatedFlower : flower)))

      setIsEditDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error updating flower:", error)
      alert("Failed to update flower")
    }
  }

  const deleteFlower = async () => {
    try {
      if (!currentItem) return

      await deleteDoc(doc(db, "flowers", currentItem.id))

      setFlowers((prev) => prev.filter((flower) => flower.id !== currentItem.id))
      setIsDeleteDialogOpen(false)
      resetForm()

      // Update stats
      setStats((prev) => ({
        ...prev,
        flowers: prev.flowers - 1,
      }))
    } catch (error) {
      console.error("Error deleting flower:", error)
      alert("Failed to delete flower")
    }
  }

  // CRUD operations for users
  const addUser = async () => {
    try {
      if (!formData.firstName || !formData.lastName) {
        alert("Please fill in all required fields")
        return
      }

      const newUser = {
        ...formData,
        ordersCount: formData.ordersCount || 0,
        memberSince: formData.memberSince || new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
        notifications: formData.notifications || {
          email: true,
          promotions: false,
          orderUpdates: true,
          newsletter: false,
        },
        address: formData.address || {
          street: "",
          city: "",
          postalCode: "",
          country: "France",
        },
      }

      const docRef = await addDoc(collection(db, "users"), newUser)

      setUsers((prev) => [...prev, { ...newUser, id: docRef.id }])
      setIsAddDialogOpen(false)
      resetForm()

      // Update stats
      setStats((prev) => ({
        ...prev,
        users: prev.users + 1,
      }))
    } catch (error) {
      console.error("Error adding user:", error)
      alert("Failed to add user")
    }
  }

  const updateUser = async () => {
    try {
      if (!currentItem || !formData.firstName || !formData.lastName) {
        alert("Invalid data for update")
        return
      }

      const updatedUser = {
        ...currentItem,
        ...formData,
      }

      await updateDoc(doc(db, "users", currentItem.id), updatedUser)

      setUsers((prev) => prev.map((user) => (user.id === currentItem.id ? updatedUser : user)))

      setIsEditDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Failed to update user")
    }
  }

  const deleteUser = async () => {
    try {
      if (!currentItem) return

      await deleteDoc(doc(db, "users", currentItem.id))

      setUsers((prev) => prev.filter((user) => user.id !== currentItem.id))
      setIsDeleteDialogOpen(false)
      resetForm()

      // Update stats
      setStats((prev) => ({
        ...prev,
        users: prev.users - 1,
      }))
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Failed to delete user")
    }
  }

  // CRUD operations for blog posts
  const addPost = async () => {
    try {
      if (!formData.title || !formData.slug) {
        alert("Please fill in all required fields")
        return
      }

      const newPost = {
        ...formData,
        commentCount: formData.commentCount || 0,
        date: formData.date || new Date().toLocaleDateString("fr-FR"),
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "blog_posts"), newPost)

      setPosts((prev) => [...prev, { ...newPost, id: docRef.id }])
      setIsAddDialogOpen(false)
      resetForm()

      // Update stats
      setStats((prev) => ({
        ...prev,
        posts: prev.posts + 1,
      }))
    } catch (error) {
      console.error("Error adding post:", error)
      alert("Failed to add post")
    }
  }

  const updatePost = async () => {
    try {
      if (!currentItem || !formData.title || !formData.slug) {
        alert("Invalid data for update")
        return
      }

      const updatedPost = {
        ...currentItem,
        ...formData,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(doc(db, "blog_posts", currentItem.id), updatedPost)

      setPosts((prev) => prev.map((post) => (post.id === currentItem.id ? updatedPost : post)))

      setIsEditDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Failed to update post")
    }
  }

  const deletePost = async () => {
    try {
      if (!currentItem) return

      await deleteDoc(doc(db, "blog_posts", currentItem.id))

      setPosts((prev) => prev.filter((post) => post.id !== currentItem.id))
      setIsDeleteDialogOpen(false)
      resetForm()

      // Update stats
      setStats((prev) => ({
        ...prev,
        posts: prev.posts - 1,
      }))
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post")
    }
  }

  // Handle add button click
  const handleAddClick = () => {
    resetForm()

    // Set default values based on active tab
    if (activeTab === "flowers") {
      setFormData({
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        author: "",
        price: 0,
        views: 0,
        postedAt: new Date().toLocaleDateString("fr-FR"),
      })
    } else if (activeTab === "users") {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          postalCode: "",
          country: "France",
        },
        notifications: {
          email: true,
          promotions: false,
          orderUpdates: true,
          newsletter: false,
        },
        memberSince: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
        ordersCount: 0,
        status: "Nouveau client",
      })
    } else if (activeTab === "blog") {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        image: "",
        date: new Date().toLocaleDateString("fr-FR"),
        author: "",
        commentCount: 0,
      })
    }

    setIsAddDialogOpen(true)
  }

  // Handle form submission
  const handleFormSubmit = () => {
    if (isEditDialogOpen) {
      switch (activeTab) {
        case "flowers":
          updateFlower()
          break
        case "users":
          updateUser()
          break
        case "blog":
          updatePost()
          break
      }
    } else {
      switch (activeTab) {
        case "flowers":
          addFlower()
          break
        case "users":
          addUser()
          break
        case "blog":
          addPost()
          break
      }
    }
  }

  // Handle edit button click
  const handleEditClick = (item: any) => {
    setCurrentItem(item)
    setFormData(item)
    setIsEditDialogOpen(true)
  }

  // Handle delete button click
  const handleDeleteClick = (item: any) => {
    setCurrentItem(item)
    setIsDeleteDialogOpen(true)
  }

  // Loading state
  if (loading || isCheckingAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-screen">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-12 bg-emerald-100 dark:bg-emerald-800/30 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
        </div>
      </div>
    )
  }

  // Access denied
  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Access Denied</h2>
            <p className="mb-4">
              This section is reserved for administrators. If you think this is an error, please contact support.
            </p>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <DashboardHeader user={user} />

      {/* Stats */}
      <StatsComponent stats={stats} loading={dataLoading} />

      {/* Tabs */}
      <Tabs defaultValue="flowers" className="mt-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="flowers" className="flex items-center gap-2">
            <Flower className="h-4 w-4" />
            <span>Flowers</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Blog</span>
          </TabsTrigger>
        </TabsList>

        {/* Flowers Tab */}
        <TabsContent value="flowers">
          <FlowersTable
            flowers={flowers}
            loading={dataLoading}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <UsersTable
            users={users}
            loading={dataLoading}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog">
          <BlogTable
            posts={posts}
            loading={dataLoading}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {activeTab === "flowers" && (
        <AddEditFlowerDialog
          isOpen={isAddDialogOpen || isEditDialogOpen}
          isEdit={isEditDialogOpen}
          formData={formData}
          onClose={() => {
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
          }}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        />
      )}

      {activeTab === "users" && (
        <AddEditUserDialog
          isOpen={isAddDialogOpen || isEditDialogOpen}
          isEdit={isEditDialogOpen}
          formData={formData}
          onClose={() => {
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
          }}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
          onNotificationChange={handleNotificationChange}
        />
      )}

      {activeTab === "blog" && (
        <AddEditPostDialog
          isOpen={isAddDialogOpen || isEditDialogOpen}
          isEdit={isEditDialogOpen}
          formData={formData}
          onClose={() => {
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
          }}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        itemType={activeTab === "flowers" ? "flower" : activeTab === "users" ? "user" : "post"}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          switch (activeTab) {
            case "flowers":
              deleteFlower()
              break
            case "users":
              deleteUser()
              break
            case "blog":
              deletePost()
              break
          }
        }}
      />
    </div>
  )
}

