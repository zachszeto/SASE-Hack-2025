"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Calendar, Users, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState("post-gig")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="logo-white.svg"
                alt="BroadCast Logo"
                width={20}
                height={20}
                className="w-12 h-12 invert"
                color="white"
              />
              <span className="text-xl font-bold text-gray-900">BroadCast</span>
            </div>
          </Link>
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Grow Your Business with Authentic Content</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with talented local creators to produce engaging content that drives real results for your business
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,200+</div>
              <div className="text-sm text-gray-600">Active Creators</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3.2x</div>
              <div className="text-sm text-gray-600">Avg. Engagement Boost</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-sm text-gray-600">Avg. Business Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">7 days</div>
              <div className="text-sm text-gray-600">Avg. Completion Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 border">
            <Button
              variant={activeTab === "post-gig" ? "default" : "ghost"}
              onClick={() => setActiveTab("post-gig")}
              className="rounded-md"
            >
              Post a Gig
            </Button>
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
              className="rounded-md"
            >
              My Dashboard
            </Button>
          </div>
        </div>

        {/* Post Gig Form */}
        {activeTab === "post-gig" && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create New Collaboration
                </CardTitle>
                <CardDescription>Tell creators about your project and what you're looking for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Gig Title</Label>
                  <Input id="title" placeholder="e.g., Instagram Reels for Coffee Shop" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food-drink">Food & Drink</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Downtown Seattle, WA" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, what you're looking for, and any specific requirements..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input id="budget" placeholder="e.g., $150" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliverables">Deliverables</Label>
                    <Input id="deliverables" placeholder="e.g., 3 Reels" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3-days">1-3 days</SelectItem>
                        <SelectItem value="1-week">1 week</SelectItem>
                        <SelectItem value="2-weeks">2 weeks</SelectItem>
                        <SelectItem value="1-month">1 month</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Compensation Type</Label>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                      Cash Only
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                      Products Only
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                      Cash + Products
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                      Revenue Share
                    </Badge>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">Post Gig</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Active Gigs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Gigs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockActiveGigs.map((gig) => (
                  <Card key={gig.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{gig.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {gig.location}
                          </CardDescription>
                        </div>
                        <Badge variant={gig.status === "active" ? "default" : "secondary"}>{gig.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Applications:</span>
                          <span className="font-medium">{gig.applications}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Budget:</span>
                          <span className="font-medium text-green-600">{gig.budget}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Deadline:</span>
                          <span className="font-medium">{gig.deadline}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Applications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {mockApplications.map((app) => (
                      <div key={app.id} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            {app.creator.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{app.creator}</div>
                            <div className="text-sm text-gray-600">{app.gig}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{app.rating}</span>
                              <span className="text-sm text-gray-500">• {app.followers} followers</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button size="sm">Accept</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mockActiveGigs = [
  {
    id: 1,
    title: "Instagram Reels for Coffee Shop",
    location: "Downtown Seattle",
    status: "active",
    applications: 12,
    budget: "$150",
    deadline: "Dec 15",
  },
  {
    id: 2,
    title: "Product Photography",
    location: "Austin, TX",
    status: "in-progress",
    applications: 8,
    budget: "$200",
    deadline: "Dec 20",
  },
]

const mockApplications = [
  {
    id: 1,
    creator: "Sarah Johnson",
    gig: "Instagram Reels for Coffee Shop",
    rating: 4.9,
    followers: "15K",
  },
  {
    id: 2,
    creator: "Mike Chen",
    gig: "Product Photography",
    rating: 4.8,
    followers: "8.5K",
  },
  {
    id: 3,
    creator: "Emma Davis",
    gig: "Instagram Reels for Coffee Shop",
    rating: 5.0,
    followers: "22K",
  },
]
