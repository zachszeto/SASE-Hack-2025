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
import Header from "@/components/ui/header"

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
      <Header/>
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
                    <a
                      href={creator.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="p-2 bg-transparent">
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  {creator.socialLinks.youtube && (
                    <a
                      href={creator.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="p-2 bg-transparent">
                        <Youtube className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  {creator.socialLinks.tiktok && (
                    <a
                      href={creator.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="p-2 bg-transparent">
                        <TrendingUp className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/creators/${creator.id}`}>View Profile</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-[#FF255A] hover:bg-[#e01f4e] text-white"
                  >
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
    name: "ses-Amy-oil",
    location: "Boston, MA",
    bio: "Food & lifestyle content creator passionate about showcasing local businesses and authentic experiences.",
    categories: ["Food & Drink", "Lifestyle"],
    followers: "16.9K",
    rating: 4.9,
    collaborations: 47,
    avatar: "/influencers/sesamyoilpfp.jpg",
    socialLinks: {
      instagram: "https://www.instagram.com/sesamyoil/?hl=en", 
      youtube: "https://www.youtube.com/@MoreBestEverFoodReviewShow",   
      tiktok: "https://www.tiktok.com/@sesamyoil?lang=en",    
    },
  },
  {
    id: 2,
    name: "Zachary Szeto",
    location: "Austin, TX",
    bio: "Tech reviewer and photographer with a focus on innovative products and startup culture.",
    categories: ["Tech", "Photography"],
    followers: "8.9K",
    rating: 4.1,
    collaborations: 23,
    avatar: "/influencers/zachszeto.jpg",
    socialLinks: {
      instagram: "d", 
      youtube: "d",   
      tiktok: "",    
    },
  },
  {
    id: 3,
    name: "Jasmine Huang",
    location: "Waltham, MA",
    bio: "Food & lifestyle content creator passionate about showcasing local businesses.",
    categories: ["Fashion", "Lifestyle"],
    followers: "22.1K",
    rating: 5.0,
    collaborations: 89,
    avatar: "/influencers/jasmine.jpg",
    socialLinks: {
      instagram: "d", 
      youtube: "",   
      tiktok: "d",    
    },
  },
  {
    id: 4,
    name: "Brandon Yeu",
    location: "Hoboken, NJ",
    bio: "Software engineering coach and music producer that loves to help others grow, both personally and professionally.",
    categories: ["Music", "Tech", "Education"],
    followers: "33.8K",
    rating: 4.7,
    collaborations: 34,
    avatar: "/influencers/brandonyeu.png",
    socialLinks: {
      instagram: "d", 
      youtube: "s",   
      tiktok: "s",    
    },
  },
  {
    id: 5,
    name: "Sherry Lin",
    location: "New York, NY",
    bio: "Beauty guru and skincare enthusiast sharing honest reviews and tutorials with my community.",
    categories: ["Beauty", "Lifestyle"],
    followers: "29.4K",
    rating: 4.9,
    collaborations: 56,
    avatar: "/influencers/sherrylin.jpg",
    socialLinks: {
      instagram: "https://www.instagram.com/sherry_xoxo_15/", 
      youtube: "",   
      tiktok: "s",    
    },
  },
  {
    id: 6,
    name: "Long Nguyen",
    location: "Timbuctu, TX",
    bio: "Local food enthusiast and photographer documenting the Pacific Northwest culinary scene.",
    categories: ["Food & Drink", "Photography"],
    followers: "4.1K",
    rating: 4.6,
    collaborations: 28,
    avatar: "/influencers/longnguyen.jpeg",
    socialLinks: {
      instagram: "", 
      youtube: "d",   
      tiktok: "d",    
    },
  },
]
