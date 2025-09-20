"use client"
import Header from "@/components/ui/header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Camera,
  Plus,
  Eye,
  MessageSquare,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for business dashboard
const mockBusinessData = {
  name: "Brew & Bean Co.",
  location: "Downtown Seattle",
  rating: 4.9,
  totalGigs: 12,
  activeGigs: 3,
  completedGigs: 9,
  totalSpent: 2400,
  avgRating: 4.8,
}

const mockActiveGigs = [
  {
    id: 1,
    title: "Instagram Reel for Coffee Shop",
    budget: 150,
    applications: 8,
    status: "active",
    posted: "2 days ago",
    deadline: "In 5 days",
    category: "Food & Drink",
  },
  {
    id: 2,
    title: "Product Photos for New Menu",
    budget: 200,
    applications: 12,
    status: "in-review",
    posted: "1 week ago",
    deadline: "In 2 days",
    category: "Photography",
  },
  {
    id: 3,
    title: "TikTok Series for Summer Drinks",
    budget: 300,
    applications: 15,
    status: "active",
    posted: "3 days ago",
    deadline: "In 1 week",
    category: "Food & Drink",
  },
]

const mockApplications = [
  {
    id: 1,
    gigId: 1,
    gigTitle: "Instagram Reel for Coffee Shop",
    creator: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "12.5K",
      rating: 4.9,
      specialties: ["Food Content", "Lifestyle"],
    },
    proposal:
      "I'd love to create an engaging reel showcasing your seasonal drinks! I have experience with food content and can deliver within 3 days.",
    appliedDate: "1 day ago",
    status: "pending",
  },
  {
    id: 2,
    gigId: 1,
    gigTitle: "Instagram Reel for Coffee Shop",
    creator: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "8.2K",
      rating: 4.7,
      specialties: ["Food Photography", "Reels"],
    },
    proposal:
      "Hi! I'm a local food content creator and would love to feature your coffee shop. Check out my portfolio for similar work.",
    appliedDate: "2 days ago",
    status: "pending",
  },
  {
    id: 3,
    gigId: 2,
    gigTitle: "Product Photos for New Menu",
    creator: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "25.1K",
      rating: 5.0,
      specialties: ["Product Photography", "Food Styling"],
    },
    proposal:
      "Professional food photographer with 5+ years experience. I can provide high-quality images that will make your menu items irresistible!",
    appliedDate: "3 days ago",
    status: "accepted",
  },
]

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="container mx-auto px-4 py-8">
        {/* Business Profile Header */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{mockBusinessData.name}</h1>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {mockBusinessData.location}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{mockBusinessData.rating} rating</span>
                </div>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Gigs</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBusinessData.activeGigs}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockBusinessData.totalSpent}</div>
              <p className="text-xs text-muted-foreground">+$650 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBusinessData.avgRating}</div>
              <p className="text-xs text-muted-foreground">From {mockBusinessData.completedGigs} completed gigs</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gigs">My Gigs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2" asChild>
                    <Link href="/business/post-gig">
                      <Plus className="w-6 h-6" />
                      Post New Gig
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                    <Link href="/marketplace">
                      <Users className="w-6 h-6" />
                      Browse Creators
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent" asChild>
                    <Link href="/business/analytics">
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
                <CardDescription>Latest updates on your gigs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New application received</p>
                      <p className="text-xs text-gray-600">Sarah Johnson applied to "Instagram Reel for Coffee Shop"</p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Gig completed</p>
                      <p className="text-xs text-gray-600">Emma Rodriguez completed "Product Photos for New Menu"</p>
                    </div>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Deadline approaching</p>
                      <p className="text-xs text-gray-600">"TikTok Series for Summer Drinks" deadline in 2 days</p>
                    </div>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gigs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Gigs</h2>
              <Button asChild>
                <Link href="/business/post-gig">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Gig
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {mockActiveGigs.map((gig) => (
                <Card key={gig.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{gig.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />${gig.budget}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {gig.applications} applications
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {gig.deadline}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={gig.status === "active" ? "default" : "secondary"}>
                          {gig.status === "active" ? "Active" : "In Review"}
                        </Badge>
                        <Badge variant="outline">{gig.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Posted {gig.posted}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/business/gig/${gig.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/business/gig/${gig.id}/applications`}>
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Applications ({gig.applications})
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Applications</h2>
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
                  Rejected
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
                        <CardDescription>Applied {application.appliedDate}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          application.status === "accepted"
                            ? "default"
                            : application.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={application.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {application.creator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{application.creator.name}</h4>
                          <span className="text-sm text-gray-600">{application.creator.followers} followers</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{application.creator.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {application.creator.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{application.proposal}</p>
                        {application.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4 mr-1" />
                              Decline
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analytics</h2>
              <Button variant="outline">Export Report</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gig Performance</CardTitle>
                  <CardDescription>Average metrics across all your gigs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Applications per gig</span>
                      <span className="font-semibold">11.7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time to first application</span>
                      <span className="font-semibold">4.2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completion rate</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average creator rating</span>
                      <span className="font-semibold">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                  <CardDescription>Your most successful gig types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Food & Drink</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">80%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Photography</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-12 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Social Media</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-10 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">50%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}