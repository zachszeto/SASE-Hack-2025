"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Search, Filter, Heart, Share2 } from "lucide-react"
import Header from "@/components/ui/header"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [showExtraGig, setShowExtraGig] = useState(false)

  const filteredGigs = mockGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || gig.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || gig.location.includes(selectedLocation)
    return matchesSearch && matchesCategory && matchesLocation
  })

  // Include extra gig if button clicked
  const displayedGigs = showExtraGig ? [...filteredGigs, extraGig] : filteredGigs

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Opportunities</h1>
          <p className="text-gray-600">Find the perfect collaboration gigs in your area</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search gigs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Seattle">Seattle</SelectItem>
                <SelectItem value="Austin">Austin</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {displayedGigs.length} of {mockGigs.length + (showExtraGig ? 1 : 0)} opportunities
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="highest-pay">Highest Pay</SelectItem>
              <SelectItem value="closest">Closest to Me</SelectItem>
              <SelectItem value="highest-rated">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gig Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGigs.map((gig) => (
            <Card key={gig.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{gig.category}</Badge>
                      {gig.urgent && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{gig.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {gig.location}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{gig.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Business Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{gig.businessRating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Deliverables:</span>
                    <span className="font-medium">{gig.deliverables}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Timeline:</span>
                    <span className="font-medium">{gig.timeline}</span>
                  </div>

                  <div className="border-t pt-3 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-green-600">{gig.reward}</div>
                      <div className="text-xs text-gray-500">{gig.type}</div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {!showExtraGig && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setShowExtraGig(true)}>
              Load More Opportunities
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Existing mock gigs
const mockGigs = [
  {
    id: 1,
    title: "Instagram Reels for Coffee Shop",
    location: "Downtown Seattle, WA",
    category: "Food & Drink",
    description:
      "Create 3 engaging Instagram Reels showcasing our specialty drinks and cozy atmosphere. Looking for someone with experience in food photography and storytelling.",
    businessRating: 4.9,
    reward: "$150",
    type: "Cash + Products",
    deliverables: "3 Reels",
    timeline: "1 week",
    urgent: false,
  },
  {
    id: 2,
    title: "TikTok Dance Challenge",
    location: "Austin, TX",
    category: "Fitness",
    description:
      "Film a fun dance routine at our new fitness studio to promote our grand opening. Must be energetic and engaging for our target audience of 18-35 year olds.",
    businessRating: 4.8,
    reward: "$200",
    type: "Cash",
    deliverables: "1 TikTok Video",
    timeline: "3 days",
    urgent: true,
  },
  {
    id: 3,
    title: "Product Unboxing Video",
    location: "Los Angeles, CA",
    category: "Fashion",
    description:
      "Create an authentic unboxing and styling video featuring our sustainable clothing line. Looking for creators who align with eco-friendly values.",
    businessRating: 5.0,
    reward: "$300",
    type: "Cash + Products",
    deliverables: "1 YouTube Video",
    timeline: "2 weeks",
    urgent: false,
  },
  {
    id: 4,
    title: "Beauty Tutorial Series",
    location: "Miami, FL",
    category: "Beauty",
    description:
      "Create a 3-part tutorial series featuring our new makeup collection. Perfect for beauty influencers with 10K+ followers.",
    businessRating: 4.7,
    reward: "$500",
    type: "Cash + Products",
    deliverables: "3 Tutorials",
    timeline: "2 weeks",
    urgent: false,
  },
  {
    id: 5,
    title: "Tech Product Review",
    location: "New York, NY",
    category: "Tech",
    description:
      "Honest review of our new smartphone accessories. Looking for tech reviewers with authentic voice and engaged audience.",
    businessRating: 4.6,
    reward: "$250",
    type: "Cash + Products",
    deliverables: "1 Review Video",
    timeline: "1 week",
    urgent: false,
  },
  {
    id: 6,
    title: "Lifestyle Brand Collaboration",
    location: "Seattle, WA",
    category: "Lifestyle",
    description:
      "Partner with us for a month-long collaboration featuring our home decor products in your daily content.",
    businessRating: 4.9,
    reward: "$800",
    type: "Cash + Products",
    deliverables: "8 Posts",
    timeline: "1 month",
    urgent: false,
  },
]

// Extra hidden gig
const extraGig = {
  id: 999,
  title: "Special Campaign Video",
  location: "San Francisco, CA",
  category: "Tech",
  description:
    "Participate in an exclusive product launch video campaign. Limited spots available for talented content creators.",
  businessRating: 5.0,
  reward: "$400",
  type: "Cash",
  deliverables: "1 Video",
  timeline: "1 week",
  urgent: true,
}
