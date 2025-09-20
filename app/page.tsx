import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users, Briefcase, Camera, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LocalCollab</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 transition-colors">
              Browse Gigs
            </Link>
            <Link href="/business" className="text-gray-600 hover:text-blue-600 transition-colors">
              For Businesses
            </Link>
            <Link href="/creators" className="text-gray-600 hover:text-blue-600 transition-colors">
              For Creators
            </Link>
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Connect Local Businesses with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
              {" "}
              Content Creators
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            The marketplace where mom & pop shops meet talented creators. Get authentic content that drives real results
            for your local business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              asChild
            >
              <Link href="/marketplace">Browse Opportunities</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/business">Post a Gig</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Active Businesses</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">Content Creators</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover exciting collaboration opportunities from local businesses in your area
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGigs.map((gig) => (
              <Card key={gig.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{gig.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {gig.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{gig.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{gig.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{gig.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{gig.reward}</div>
                      <div className="text-sm text-gray-500">{gig.type}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/marketplace">View All Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to start collaborating</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Businesses */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">For Businesses</h3>
              <div className="space-y-6">
                {businessSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Creators */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">For Creators</h3>
              <div className="space-y-6">
                {creatorSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Collaborating?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and creators already making authentic connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/business">I'm a Business</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/creators">I'm a Creator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LocalCollab</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting local businesses with talented content creators for authentic collaborations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/business" className="hover:text-white transition-colors">
                    Post a Gig
                  </Link>
                </li>
                <li>
                  <Link href="/business/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/business/success-stories" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Creators</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors">
                    Browse Gigs
                  </Link>
                </li>
                <li>
                  <Link href="/creators/portfolio" className="hover:text-white transition-colors">
                    Build Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/creators/tips" className="hover:text-white transition-colors">
                    Creator Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 LocalCollab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const featuredGigs = [
  {
    id: 1,
    title: "Instagram Reels for Coffee Shop",
    location: "Downtown Seattle",
    category: "Food & Drink",
    description: "Create 3 engaging Instagram Reels showcasing our specialty drinks and cozy atmosphere.",
    rating: 4.9,
    reward: "$150",
    type: "Cash + Products",
  },
  {
    id: 2,
    title: "TikTok Dance Challenge",
    location: "Austin, TX",
    category: "Fitness",
    description: "Film a fun dance routine at our new fitness studio to promote our grand opening.",
    rating: 4.8,
    reward: "$200",
    type: "Cash",
  },
  {
    id: 3,
    title: "Product Unboxing Video",
    location: "Los Angeles, CA",
    category: "Fashion",
    description: "Create an authentic unboxing and styling video featuring our sustainable clothing line.",
    rating: 5.0,
    reward: "$300",
    type: "Cash + Products",
  },
]

const businessSteps = [
  {
    title: "Post Your Gig",
    description: "Describe your collaboration needs, set your budget, and specify deliverables.",
  },
  {
    title: "Review Applications",
    description: "Browse creator profiles, portfolios, and proposals to find the perfect match.",
  },
  {
    title: "Collaborate & Create",
    description: "Work directly with your chosen creator to bring your vision to life.",
  },
  {
    title: "Get Results",
    description: "Receive high-quality content and watch your engagement grow.",
  },
]

const creatorSteps = [
  {
    title: "Browse Opportunities",
    description: "Explore gigs in your area that match your skills and interests.",
  },
  {
    title: "Submit Proposals",
    description: "Apply to gigs with your portfolio and creative ideas.",
  },
  {
    title: "Create Content",
    description: "Work with businesses to create authentic, engaging content.",
  },
  {
    title: "Get Paid & Build Reputation",
    description: "Earn money and build your portfolio with successful collaborations.",
  },
]
