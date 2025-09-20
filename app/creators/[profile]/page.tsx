"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  MapPin,
  Star,
  TrendingUp,
  DollarSign,
  Eye,
  MessageSquare,
  Instagram,
  Youtube,
  Edit,
  Plus,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for creator profile
const mockCreatorData = {
  name: "Sarah Johnson",
  username: "@sarahjohnson",
  location: "Seattle, WA",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/creator-cover-photo.jpg",
  bio: "Food & lifestyle content creator passionate about showcasing local businesses. I love creating authentic, engaging content that tells your brand's story.",
  rating: 4.9,
  totalReviews: 47,
  completedGigs: 23,
  totalEarnings: 3200,
  responseRate: 98,
  followers: {
    instagram: "12.5K",
    tiktok: "8.2K",
    youtube: "3.1K",
  },
  specialties: ["Food Photography", "Lifestyle Content", "Instagram Reels", "Product Reviews"],
  portfolio: [
    {
      id: 1,
      title: "Coffee Shop Reel",
      type: "video",
      thumbnail: "/coffee-shop-reel.jpg",
      platform: "Instagram",
      engagement: "2.1K likes",
    },
    {
      id: 2,
      title: "Restaurant Review",
      type: "video",
      thumbnail: "/restaurant-review.png",
      platform: "TikTok",
      engagement: "5.3K views",
    },
    {
      id: 3,
      title: "Product Photography",
      type: "image",
      thumbnail: "/product-photography-still-life.png",
      platform: "Instagram",
      engagement: "1.8K likes",
    },
    {
      id: 4,
      title: "Bakery Feature",
      type: "video",
      thumbnail: "/bakery-feature.jpg",
      platform: "YouTube",
      engagement: "12K views",
    },
  ],
}

const mockApplications = [
  {
    id: 1,
    gigTitle: "Instagram Reel for Coffee Shop",
    business: "Brew & Bean Co.",
    budget: 150,
    status: "pending",
    appliedDate: "2 days ago",
    deadline: "In 3 days",
  },
  {
    id: 2,
    gigTitle: "Product Photos for Bakery",
    business: "Golden Gate Bakery",
    budget: 300,
    status: "accepted",
    appliedDate: "1 week ago",
    deadline: "In 2 days",
  },
  {
    id: 3,
    gigTitle: "TikTok for Local Boutique",
    business: "Style Studio",
    budget: 200,
    status: "completed",
    appliedDate: "2 weeks ago",
    deadline: "Completed",
  },
]

const mockReviews = [
  {
    id: 1,
    business: "Brew & Bean Co.",
    rating: 5,
    review:
      "Sarah created an amazing reel that perfectly captured our brand vibe. The content was delivered on time and exceeded our expectations!",
    date: "1 week ago",
    gigTitle: "Instagram Reel for Coffee Shop",
  },
  {
    id: 2,
    business: "Golden Gate Bakery",
    rating: 5,
    review:
      "Professional, creative, and easy to work with. The photos Sarah took of our pastries were absolutely stunning and really boosted our social media engagement.",
    date: "2 weeks ago",
    gigTitle: "Product Photography Session",
  },
  {
    id: 3,
    business: "Style Studio",
    rating: 4,
    review:
      "Great work on the TikTok content! Sarah understood our brand aesthetic and created content that resonated with our target audience.",
    date: "3 weeks ago",
    gigTitle: "TikTok Content Creation",
  },
]

export default function CreatorProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-white.svg"
              alt="BroadCast Logo"
              width={20}
              height={20}
              className="w-12 h-12 invert"
              color="white"
            />
            <span className="text-xl font-bold text-gray-900">BroadCast</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">

            {/* For Businesses: proper group wrapper */}
            <div className="relative group">
              {/* Non-clickable trigger */}
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors inline-flex items-center cursor-default select-none">
                For Businesses
                <span className="ml-1 text-gray-400 group-hover:text-blue-600 transition-colors">▾</span>
              </span>

              {/* Hover bridge + menu */}
              <div className="absolute left-0">
                {/* Small invisible spacer to avoid flicker */}
                <div className="h-3" />
                <div
                  className="w-56 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg opacity-0 translate-y-1 transition-all duration-150
                            pointer-events-none
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                  role="menu"
                  aria-label="For Businesses"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/creators"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        Browse Creators
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/business"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        Post a Gig
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* For Creators: proper group wrapper */}
            <div className="relative group">
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors inline-flex items-center cursor-default select-none">
                For Creators
                <span className="ml-1 text-gray-400 group-hover:text-blue-600 transition-colors">▾</span>
              </span>

              <div className="absolute left-0">
                <div className="h-3" />
                <div
                  className="w-56 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg opacity-0 translate-y-1 transition-all duration-150
                            pointer-events-none
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                  role="menu"
                  aria-label="For Creators"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/creators/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/marketplace"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50/60 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        Browse Gigs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border overflow-hidden mb-8">
          {/* Cover Image */}
          <div
            className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative"
            style={{
              backgroundImage: `url(${mockCreatorData.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <Button variant="secondary" size="sm" className="absolute top-4 right-4 bg-white/90 hover:bg-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Cover
            </Button>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative -mt-16">
                <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarImage src={mockCreatorData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{mockCreatorData.name}</h1>
                    <p className="text-gray-600">{mockCreatorData.username}</p>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {mockCreatorData.location}
                    </p>
                  </div>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <p className="text-gray-700 mt-4 max-w-2xl">{mockCreatorData.bio}</p>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span className="text-sm font-medium">{mockCreatorData.followers.instagram}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/tiktok.svg"
                      alt="TikTok Logo"
                      width={16} // 4 * 4px = 16px to match previous size
                      height={16}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{mockCreatorData.followers.tiktok}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium">{mockCreatorData.followers.youtube}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {mockCreatorData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {mockCreatorData.rating}
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-xs text-muted-foreground">From {mockCreatorData.totalReviews} reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Gigs</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCreatorData.completedGigs}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockCreatorData.totalEarnings}</div>
              <p className="text-xs text-muted-foreground">+$450 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCreatorData.responseRate}%</div>
              <p className="text-xs text-muted-foreground">Within 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to get more gig opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile completion</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="w-full" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Profile photo added</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Bio completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Portfolio items added</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      <span>Add verification documents</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your creator journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2" asChild>
                    <Link href="/marketplace">
                      <Eye className="w-6 h-6" />
                      Browse Gigs
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                    <Link href="/creators/portfolio">
                      <Plus className="w-6 h-6" />
                      Add Portfolio Item
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                    <Link href="/creators/analytics">
                      <TrendingUp className="w-6 h-6" />
                      View Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest updates and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Gig completed</p>
                      <p className="text-xs text-gray-600">
                        You completed "Product Photos for Bakery" for Golden Gate Bakery
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New review received</p>
                      <p className="text-xs text-gray-600">Brew & Bean Co. left you a 5-star review</p>
                    </div>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Application accepted</p>
                      <p className="text-xs text-gray-600">
                        Your application for "TikTok for Local Boutique" was accepted
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Portfolio</h2>
              <Button asChild>
                <Link href="/creators/portfolio/add">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCreatorData.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="opacity-0 hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{item.platform}</span>
                      <span>{item.engagement}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="outline" size="sm">
                  Pending
                </Button>
                <Button variant="outline" size="sm">
                  Accepted
                </Button>
                <Button variant="outline" size="sm">
                  Completed
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {mockApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{application.gigTitle}</CardTitle>
                        <CardDescription>{application.business}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            application.status === "accepted"
                              ? "default"
                              : application.status === "completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {application.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">${application.budget}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Applied {application.appliedDate}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {application.deadline}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Gig
                        </Button>
                        {application.status === "accepted" && (
                          <Button size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message Business
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{mockCreatorData.rating}</span>
                <span className="text-gray-600">({mockCreatorData.totalReviews} reviews)</span>
              </div>
            </div>

            <div className="grid gap-6">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{review.business}</CardTitle>
                        <CardDescription>{review.gigTitle}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{review.review}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}