import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, Star, Users, TrendingUp, Instagram, Youtube, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function CreatorProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch creator data based on params.id
  const creator = mockCreatorProfile

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LocalCollab</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/creators">Back to Creators</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-orange-500 text-white">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2 mb-4">
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
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{creator.name}</h1>
                    <p className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      {creator.location}
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-semibold">{creator.rating}</span>
                      <span className="text-gray-500">({creator.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700">Hire Creator</Button>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{creator.bio}</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {creator.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.followers}</div>
                    <div className="text-sm text-gray-500">Total Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.collaborations}</div>
                    <div className="text-sm text-gray-500">Collaborations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.avgEngagement}</div>
                    <div className="text-sm text-gray-500">Avg Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.responseTime}</div>
                    <div className="text-sm text-gray-500">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="rates">Rates</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{item.platform}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        {item.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {creator.reviewsList.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200">{review.businessName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.businessName}</h4>
                          <p className="text-sm text-gray-500">{review.project}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creator.serviceRates.map((service) => (
                <Card key={service.type}>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.type}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 mb-4">{service.price}</div>
                    <ul className="space-y-2">
                      {service.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {creator.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{creator.fullBio}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {creator.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                  <p className="text-gray-600">{creator.experience}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Equipment</h4>
                  <ul className="space-y-1">
                    {creator.equipment.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const mockCreatorProfile = {
  id: 1,
  name: "Sarah Johnson",
  location: "Seattle, WA",
  bio: "Food & lifestyle content creator passionate about showcasing local businesses and authentic experiences.",
  fullBio:
    "I'm a Seattle-based content creator with over 3 years of experience helping local businesses tell their stories through engaging visual content. My passion lies in discovering hidden gems and sharing authentic experiences that resonate with my community. I believe in the power of storytelling to connect brands with their ideal customers.",
  categories: ["Food & Drink", "Lifestyle", "Photography"],
  followers: "15.2K",
  rating: 4.9,
  reviews: 47,
  collaborations: 47,
  avgEngagement: "8.2%",
  responseTime: "< 2 hours",
  avatar: "/young-woman-food-blogger.jpg",
  socialLinks: {
    instagram: true,
    youtube: true,
    tiktok: false,
  },
  specialties: ["Food Photography", "Restaurant Reviews", "Local Business Features", "Lifestyle Content"],
  experience:
    "3+ years creating content for local businesses, with a focus on authentic storytelling and community engagement. Featured in Seattle Food & Wine Magazine.",
  equipment: [
    "Canon EOS R5 Camera",
    "Professional Lighting Kit",
    "DJI Mini 3 Pro Drone",
    "Adobe Creative Suite",
    "Professional Audio Equipment",
  ],
  portfolio: [
    {
      id: 1,
      title: "Cozy Coffee Shop Feature",
      description: "Instagram Reels series showcasing local coffee culture",
      platform: "Instagram",
      views: "12.5K",
    },
    {
      id: 2,
      title: "Farm-to-Table Restaurant",
      description: "YouTube video highlighting sustainable dining",
      platform: "YouTube",
      views: "8.2K",
    },
    {
      id: 3,
      title: "Local Bakery Spotlight",
      description: "Behind-the-scenes content creation",
      platform: "Instagram",
      views: "15.1K",
    },
  ],
  serviceRates: [
    {
      type: "Instagram Reels Package",
      description: "Perfect for showcasing your business in short-form content",
      price: "$150-250",
      includes: [
        "3 Instagram Reels",
        "Professional editing",
        "Trending audio selection",
        "2 rounds of revisions",
        "Usage rights included",
      ],
    },
    {
      type: "YouTube Feature Video",
      description: "In-depth business feature with storytelling focus",
      price: "$300-500",
      includes: [
        "5-10 minute feature video",
        "Professional filming & editing",
        "Custom thumbnail design",
        "SEO-optimized description",
        "Cross-platform promotion",
      ],
    },
  ],
  reviewsList: [
    {
      id: 1,
      businessName: "Pike Place Roasters",
      project: "Instagram Reels Series",
      rating: 5.0,
      comment:
        "Sarah exceeded our expectations! Her content perfectly captured our brand's personality and drove significant foot traffic to our shop.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      businessName: "Green Leaf Bistro",
      project: "YouTube Feature Video",
      rating: 4.8,
      comment:
        "Professional, creative, and easy to work with. The video she created has become our most effective marketing tool.",
      date: "1 month ago",
    },
  ],
}
