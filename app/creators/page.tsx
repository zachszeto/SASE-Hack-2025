"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, TrendingUp, Instagram, Youtube, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CreatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const filteredCreators = mockCreators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || creator.categories.includes(selectedCategory)
    const matchesLocation = selectedLocation === "all" || creator.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Talented Creators</h1>
          <p className="text-gray-600">Find the perfect content creator for your next collaboration</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search creators..."
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
            Showing {filteredCreators.length} of {mockCreators.length} creators
          </p>
          <Select defaultValue="highest-rated">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highest-rated">Highest Rated</SelectItem>
              <SelectItem value="most-followers">Most Followers</SelectItem>
              <SelectItem value="most-collaborations">Most Collaborations</SelectItem>
              <SelectItem value="newest">Newest Members</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Creator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <Card key={creator.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-600 to-orange-500 text-white">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{creator.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {creator.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm text-center">{creator.bio}</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {creator.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{creator.followers}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-gray-900">{creator.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{creator.collaborations}</div>
                    <div className="text-xs text-gray-500">Collabs</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-2">
                  {creator.socialLinks.instagram && (
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  )}
                  {creator.socialLinks.youtube && (
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <Youtube className="w-4 h-4" />
                    </Button>
                  )}
                  {creator.socialLinks.tiktok && (
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/creators/${creator.id}`}>View Profile</Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Creators
          </Button>
        </div>
      </div>
    </div>
  )
}

const mockCreators = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Seattle, WA",
    bio: "Food & lifestyle content creator passionate about showcasing local businesses and authentic experiences.",
    categories: ["Food & Drink", "Lifestyle"],
    followers: "15.2K",
    rating: 4.9,
    collaborations: 47,
    avatar: "/young-woman-food-blogger.jpg",
    socialLinks: {
      instagram: true,
      youtube: true,
      tiktok: false,
    },
  },
  {
    id: 2,
    name: "Mike Chen",
    location: "Austin, TX",
    bio: "Tech reviewer and photographer with a focus on innovative products and startup culture.",
    categories: ["Tech", "Photography"],
    followers: "8.5K",
    rating: 4.8,
    collaborations: 23,
    avatar: "/asian-man-tech-reviewer.jpg",
    socialLinks: {
      instagram: true,
      youtube: true,
      tiktok: true,
    },
  },
  {
    id: 3,
    name: "Emma Davis",
    location: "Los Angeles, CA",
    bio: "Fashion and beauty influencer helping brands connect with Gen Z through authentic storytelling.",
    categories: ["Fashion", "Beauty"],
    followers: "22.1K",
    rating: 5.0,
    collaborations: 89,
    avatar: "/fashion-influencer-young-woman.png",
    socialLinks: {
      instagram: true,
      youtube: false,
      tiktok: true,
    },
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    location: "Miami, FL",
    bio: "Fitness coach and wellness advocate creating motivational content for active lifestyles.",
    categories: ["Fitness", "Lifestyle"],
    followers: "12.8K",
    rating: 4.7,
    collaborations: 34,
    avatar: "/hispanic-man-fitness-trainer.jpg",
    socialLinks: {
      instagram: true,
      youtube: true,
      tiktok: true,
    },
  },
  {
    id: 5,
    name: "Jessica Kim",
    location: "New York, NY",
    bio: "Beauty guru and skincare enthusiast sharing honest reviews and tutorials with my community.",
    categories: ["Beauty", "Lifestyle"],
    followers: "18.9K",
    rating: 4.9,
    collaborations: 56,
    avatar: "/korean-woman-beauty-blogger.jpg",
    socialLinks: {
      instagram: true,
      youtube: true,
      tiktok: false,
    },
  },
  {
    id: 6,
    name: "David Thompson",
    location: "Seattle, WA",
    bio: "Local food enthusiast and photographer documenting the Pacific Northwest culinary scene.",
    categories: ["Food & Drink", "Photography"],
    followers: "9.3K",
    rating: 4.6,
    collaborations: 28,
    avatar: "/bearded-man-food-photographer.jpg",
    socialLinks: {
      instagram: true,
      youtube: false,
      tiktok: false,
    },
  },
]
