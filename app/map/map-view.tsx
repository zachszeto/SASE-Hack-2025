"use client"

import { useMemo, useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Coordinate = [number, number]

type Role = "guest" | "business" | "creator"

type PinSize = "sm" | "md" | "lg"

type Creator = {
  id: string
  name: string
  focus: string
  platform: string
  followers: string
  location: string
  position: Coordinate
  imageUrl: string
  tags: string[]
  pinSize: PinSize
}

type Business = {
  id: string
  name: string
  category: string
  location: string
  position: Coordinate
  imageUrl: string
  tags: string[]
  pinSize: PinSize
}

type MapPoint =
  | (Creator & { kind: "creator" })
  | (Business & { kind: "business" })

const center: Coordinate = [42.3601, -71.0589]

const creators: Creator[] = [
  {
    id: "creator-adrizzy",
    name: "Adrizzy",
    focus: "Cafés & cozy city moments",
    platform: "TikTok",
    followers: "4.2k",
    location: "Allston",
    position: [42.3506, -71.1311],
    imageUrl: "/influencers/adrizzy.jpeg",
    tags: ["Food & Drink", "Lifestyle"],
    pinSize: "md",
  },
  {
    id: "creator-sherry",
    name: "Sherry Lin",
    focus: "Boutique fashion hauls",
    platform: "Instagram",
    followers: "6.1k",
    location: "Back Bay",
    position: [42.3509, -71.0813],
    imageUrl: "/influencers/sherry.png",
    tags: ["Fashion & Retail", "Lifestyle"],
    pinSize: "lg",
  },
  {
    id: "creator-nikil",
    name: "Nikil Viswanathan",
    focus: "Local restaurant reviews",
    platform: "YouTube",
    followers: "9.4k",
    location: "Cambridge",
    position: [42.3727, -71.1167],
    imageUrl: "/influencers/nikil.jpg",
    tags: ["Food & Drink", "Campus Life"],
    pinSize: "sm",
  },
  {
    id: "creator-jasmine",
    name: "Jasmine Huang",
    focus: "Wellness & pilates",
    platform: "TikTok",
    followers: "5.8k",
    location: "Fenway",
    position: [42.3446, -71.0979],
    imageUrl: "/influencers/jasmine.jpg",
    tags: ["Health & Wellness", "Lifestyle"],
    pinSize: "md",
  },
  {
    id: "creator-zach",
    name: "Zach Szeto",
    focus: "Street food adventures",
    platform: "Instagram",
    followers: "3.9k",
    location: "South End",
    position: [42.3387, -71.0696],
    imageUrl: "/influencers/zach.jpg",
    tags: ["Food & Drink", "Hidden Gems"],
    pinSize: "lg",
  },
  {
    id: "creator-me",
    name: "Long Nguyen",
    focus: "Campus lifestyle",
    platform: "TikTok",
    followers: "2.7k",
    location: "Somerville",
    position: [42.3874, -71.1007],
    imageUrl: "/influencers/me.jpg",
    tags: ["Campus Life", "Lifestyle"],
    pinSize: "sm",
  },
]

const businesses: Business[] = [
  {
    id: "biz-common-good",
    name: "Common Good Co",
    category: "Café",
    location: "Waltham",
    position: [42.374, -71.2369],
    imageUrl: "/businesses/first.jpeg",
    tags: ["Food & Drink", "Cozy Vibes"],
    pinSize: "sm",
  },
  {
    id: "biz-seaport-social",
    name: "Seaport Social House",
    category: "Restaurant",
    location: "Seaport",
    position: [42.3526, -71.0432],
    imageUrl: "/businesses/second.jpeg",
    tags: ["Food & Drink", "Night Out"],
    pinSize: "lg",
  },
  {
    id: "biz-fenway-fuel",
    name: "Fenway Fuel Bar",
    category: "Bar",
    location: "Fenway",
    position: [42.3471, -71.0971],
    imageUrl: "/businesses/third.jpeg",
    tags: ["Night Out", "Food & Drink"],
    pinSize: "md",
  },
  {
    id: "biz-north-end-pasta",
    name: "North End Pasta Co.",
    category: "Italian",
    location: "North End",
    position: [42.3661, -71.0556],
    imageUrl: "/businesses/fourth.jpeg",
    tags: ["Food & Drink", "Hidden Gems"],
    pinSize: "sm",
  },
  {
    id: "biz-charles-market",
    name: "Charles Commons Market",
    category: "Grocery",
    location: "Cambridge",
    position: [42.3729, -71.1188],
    imageUrl: "/businesses/fifth.webp",
    tags: ["Local Goods", "Food & Drink"],
    pinSize: "md",
  },
  {
    id: "biz-southie-sips",
    name: "Southie Sips Espresso",
    category: "Coffee",
    location: "South Boston",
    position: [42.3362, -71.0451],
    imageUrl: "/businesses/sixth.jpeg",
    tags: ["Coffee Break", "Food & Drink"],
    pinSize: "lg",
  },
  {
    id: "biz-harbor-pizza",
    name: "Harbor Street Pizza",
    category: "Pizza",
    location: "Waterfront",
    position: [42.3603, -71.0482],
    imageUrl: "/businesses/seventh.avif",
    tags: ["Food & Drink", "Hangouts"],
    pinSize: "md",
  },
  {
    id: "biz-downtown-threads",
    name: "Downtown Threads",
    category: "Boutique",
    location: "Downtown Crossing",
    position: [42.3555, -71.0624],
    imageUrl: "/businesses/eighth.jpg",
    tags: ["Fashion & Retail", "Lifestyle"],
    pinSize: "sm",
  },
  {
    id: "biz-union-studio",
    name: "Union Creative Studio",
    category: "Studio",
    location: "Somerville",
    position: [42.3795, -71.0973],
    imageUrl: "/businesses/ninth.jpeg",
    tags: ["Arts & Culture", "Events"],
    pinSize: "lg",
  },
  {
    id: "biz-brighton-bloom",
    name: "Brighton Bloom",
    category: "Plant Shop",
    location: "Brighton",
    position: [42.3487, -71.1521],
    imageUrl: "/businesses/tenth.jpeg",
    tags: ["Lifestyle", "Home"],
    pinSize: "md",
  },
]

const isLoggedIn = false
const userRole: Role = "guest"

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#fdf9f6]">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-slate-900"></div>
        <span className="text-sm font-medium text-slate-500">Loading map…</span>
      </div>
    </div>
  ),
})

export default function MapView() {
  const [role, setRole] = useState<Role>(userRole)
  const [selectedTheme, setSelectedTheme] = useState<string>("All")
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [showCreators, setShowCreators] = useState(true)
  const [showBusinesses, setShowBusinesses] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const allPoints: MapPoint[] = useMemo(
    () => [
      ...creators.map((item) => ({ ...item, kind: "creator" as const })),
      ...businesses.map((item) => ({ ...item, kind: "business" as const })),
    ],
    []
  )

  const roleFilteredPoints = useMemo(() => {
    if (role === "guest") {
      return allPoints
    }
    if (role === "business") {
      return allPoints.filter((point) => point.kind === "creator")
    }
    return allPoints.filter((point) => point.kind === "business")
  }, [allPoints, role])

  // ✅ Now includes legend + theme filters
  const visiblePoints: MapPoint[] = useMemo(() => {
    let points = roleFilteredPoints.filter((point) => {
      if (point.kind === "creator" && !showCreators) return false
      if (point.kind === "business" && !showBusinesses) return false
      return true
    })

    if (selectedTheme !== "All") {
      points = points.filter((point) => point.tags.includes(selectedTheme))
    }

    return points
  }, [roleFilteredPoints, showCreators, showBusinesses, selectedTheme])

  useEffect(() => {
    if (selectedPointId && !visiblePoints.some((p) => p.id === selectedPointId)) {
      setSelectedPointId(null)
    }
  }, [visiblePoints, selectedPointId])

  useEffect(() => {
    if (hoveredPointId && !visiblePoints.some((p) => p.id === hoveredPointId)) {
      setHoveredPointId(null)
    }
  }, [visiblePoints, hoveredPointId])

  useEffect(() => {
    console.log("Legend state:", { showCreators, showBusinesses })
  }, [showCreators, showBusinesses])

  useEffect(() => {
    console.log(
      "visiblePoints (count):",
      visiblePoints.length,
      visiblePoints.map((p) => ({ id: p.id, kind: p.kind }))
    )
  }, [visiblePoints])

  const handlePointAction = useCallback((point: MapPoint) => {
    if (!isLoggedIn && typeof window !== "undefined") {
      window.location.href = "/login"
      return
    }
    setSelectedPointId(point.id)
  }, [])

  const handlePointSelect = useCallback((point: MapPoint) => {
    setSelectedPointId(point.id)
  }, [])

  const handlePointHover = useCallback((pointId: string | null) => {
    setHoveredPointId(pointId)
  }, [])

  if (!isClient) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#fdf9f6]">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-slate-900"></div>
          <span className="text-sm font-medium text-slate-500">Loading map…</span>
        </div>
      </main>
    )
  }

  return (
    <main className="relative h-screen w-full">
      {/* Legend */}
      <Card className="absolute bottom-24 left-4 w-56 h-38 shadow-lg z-[9999]">
        <CardContent className="flex flex-col items-center gap-4">
          {/* Legend Title */}
          <h2 className="text-lg font-semibold text-center">Legend</h2>

          {/* Creators */}
          <div className="flex items-center gap-3 w-full justify-start">
            <Checkbox
              id="show-creators"
              checked={showCreators}
              onCheckedChange={(checked) => setShowCreators(!!checked)}
            />
            <Label htmlFor="show-creators" className="text-base font-medium">
              Show Creators
            </Label>
          </div>

          {/* Businesses */}
          <div className="flex items-center gap-3 w-full justify-start">
            <Checkbox
              id="show-businesses"
              checked={showBusinesses}
              onCheckedChange={(checked) => setShowBusinesses(!!checked)}
            />
            <Label htmlFor="show-businesses" className="text-base font-medium">
              Show Businesses
            </Label>
          </div>
        </CardContent>
      </Card>


      {/* Map */}
      <LeafletMap
        center={center}
        visiblePoints={visiblePoints}
        onPointAction={handlePointAction}
        onPointSelect={handlePointSelect}
        onPointHover={handlePointHover}
        selectedPointId={selectedPointId}
        hoveredPointId={hoveredPointId}
      />
    </main>
  )
}
