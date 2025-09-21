import dynamic from "next/dynamic"
import Header from "@/components/ui/header"

const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <main className="flex flex-1 items-center justify-center bg-[#fdf9f6]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-2"></div>
        <span className="text-sm font-medium text-slate-500">Loading map…</span>
      </div>
    </main>
  ),
})

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#fff3f5] via-[#fdf9f6] to-[#f0f9ff]">
      <div className="relative z-[9999] pointer-events-auto">
        <Header />
      </div>
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  )
}
