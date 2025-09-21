"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, Star, TrendingUp } from "lucide-react"
import Header from "@/components/ui/header"
import Link from "next/link"

export default function BusinessPage() {
  // If you still need any local state for the form, keep it here
  const [compType, setCompType] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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

        {/* Post Gig Form (moved to top, tabs removed) */}
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
                  {["Cash Only", "Products Only", "Cash + Products", "Revenue Share"].map((label) => (
                    <Badge
                      key={label}
                      variant={compType === label ? "default" : "outline"}
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => setCompType(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-[#FF255A] hover:bg-[#e01f4e]">
                <Link href="/marketplace">Post Gig</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
