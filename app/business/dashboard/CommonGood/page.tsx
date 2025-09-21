"use client"

import Header from "@/components/ui/header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Eye,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

// Company info (creator-facing)
const company = {
  name: "Common Good Co.",
  location: "Waltham, MA",
  rating: 4.9,
  followers: "12.3K",
  about:
    "Neighborhood cafe known for seasonal drinks and baked goods. We collaborate with local creators on short-form video, lifestyle photography, and product highlights.",
  highlights: [
    "Fast approvals and clear briefs",
    "Free menu tastings for creators",
    "Flexible timelines for on-location shoots",
  ],
  site: "https://www.commongoodwaltham.com/",
  cover: "/CommonGood.png",
}

// Open gigs (public view)
const openGigs = [
  {
    id: 999,
    title: "TikTok for STEM Connect Career Fair",
    budget: 400,
    applications: 0,
    posted: "Just now",
    deadline: "In 3 days",
    category: "Tech",
    type: "Short-form video",
    location: "On-site",
  },
  {
    id: 1,
    title: "Instagram Reel for Tea Shop",
    budget: 150,
    applications: 8,
    posted: "2 days ago",
    deadline: "In 5 days",
    category: "Food & Drink",
    type: "Short-form video",
    location: "On-site",
  },
  {
    id: 2,
    title: "Product Photos for New Menu",
    budget: 200,
    applications: 12,
    posted: "1 week ago",
    deadline: "In 2 days",
    category: "Photography",
    type: "Photography",
    location: "On-site",
  },
  {
    id: 3,
    title: "TikTok Series for Summer Drinks",
    budget: 300,
    applications: 15,
    posted: "3 days ago",
    deadline: "In 1 week",
    category: "Food & Drink",
    type: "Short-form video",
    location: "Hybrid",
  },
]

export default function CompanyOverview() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Company Header (public/creator view) */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img src={company.cover} alt={`${company.name} logo`} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {company.rating} rating
                  </span>
                  <span className="text-sm text-gray-600">{company.followers} followers</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={company.site} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/creators">Follow</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs: Overview | Open Gigs */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gigs">Open Gigs</TabsTrigger>
          </TabsList>

          {/* Overview: about + highlights + simple stats for creators */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
                <CardDescription>Overview and collaboration details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{company.about}</p>
                <div className="space-y-2">
                  {company.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-sm text-gray-700">{h}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Collaborations</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Currently hiring creators</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Typical Budget</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$150–$400</div>
                  <p className="text-xs text-muted-foreground">Per project range</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Creator Sentiment</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground">Average review from creators</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Open Gigs: creator actions (view/apply) */}
          <TabsContent value="gigs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Open Gigs</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Sort</Button>
              </div>
            </div>

            <div className="grid gap-6">
              {openGigs.map((gig) => (
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
                            {gig.applications} applicants
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {gig.deadline}
                          </span>
                          <Badge variant="outline">{gig.category}</Badge>
                          <Badge variant="secondary">{gig.type}</Badge>
                          <Badge variant="outline">{gig.location}</Badge>
                        </CardDescription>
                        <p className="text-sm text-gray-600 mt-2">
                          Posted {gig.posted}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Ensure portfolio links are up to date before applying.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/gig/${gig.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/gig/${gig.id}/apply`}>
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Apply
                          </Link>
                        </Button>
                      </div>
                    </div>
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
