"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

/* ---------- Types ---------- */
type Dir = "next" | "prev"
const INTERVAL_MS = 4500

/* ---------- Pinterest Data ---------- */
const heroPins = [
  { src: "/User4.png", alt: "Café flat lay" },
  { src: "/User3.png", alt: "Creator filming" },
  { src: "/User2.png", alt: "Late night pizza" },
  { src: "/User1.png", alt: "Fashion mirror shot" },
  //{ src: "/businesses/eighth.jpg", alt: "Campus hangout" },
  //{ src: "/influencers/jasmine.jpg", alt: "Wellness studio" },
]

const featuredBoards = [
  {
    title: "Cozy café shoots",
    subtitle: "Warm drinks, analog vibes, and regulars telling the story",
    image: "/businesses/third.jpeg",
    accent: "from-rose-500/10 via-rose-400/5 to-white",
  },
  {
    title: "Neighborhood fashion drops",
    subtitle: "Boutiques, thrift hauls, and campus lookbooks from micro-creators",
    image: "/influencers/sherry.png",
    accent: "from-orange-400/10 via-amber-300/10 to-white",
  },
  {
    title: "Night bites trail",
    subtitle: "Tacos, late-night slices, and hidden speakeasies captured by locals",
    image: "/businesses/seventh.png",
    accent: "from-purple-400/10 via-sky-300/10 to-white",
  },
  {
    title: "Wellness pop-ups",
    subtitle: "Pilates in the park, juice collabs, and feel-good routines",
    image: "/influencers/jasmine.jpg",
    accent: "from-emerald-400/10 via-teal-300/10 to-white",
  },
]

const colorStories = [
  {
    eyebrow: "Traditional ads are tuned out",
    title: "Marketing hits different when it comes from people you recognize",
    body:
      "Premium subscriptions, ad blockers, and templated influencer spots make old-school marketing invisible. We let corner shops tap the voices classmates, coworkers, and neighbors already follow.",
    action: { label: "See it on the map", href: "/map" },
    collage: ["/businesses/fourth.jpeg", "/businesses/second.jpeg", "/influencers/adrizzy.png"],
    backdrop: "bg-[#fff4cc]",
    accent: "text-[#b73c19]",
  },
  {
    eyebrow: "Flip the playbook",
    title: "Give everyday creators their first brand deal",
    body:
      "Creators apply, shoot, and get paid. Small businesses walk away with authentic content under $500. Everyone ends up rooting for the same local wins.",
    action: { label: "Build a board", href: "/collections" },
    collage: ["/influencers/me.jpg", "/businesses/first.jpeg", "/businesses/ninth.jpeg"],
    backdrop: "bg-[#c9f4ef]",
    accent: "text-[#006d5b]",
  },
]

const proofPoints = [
  { stat: "55%", body: "of emerging creators say finding and managing brand deals is their biggest hurdle." },
  { stat: "79%", body: "of shoppers say UGC highly influences what they buy when it comes from people they relate to." },
  { stat: "$<1000", body: "is what most small businesses can spend on marketing each year — far below big-influencer rates." },
]

/* ---------- Hooks ---------- */
function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  }, [callback])
  useEffect(() => {
    if (delay == null) return
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

/* =====================================================
   HERO: Single‑flip implementation
   -----------------------------------------------------
   Fixes "double flip" by:
   1) Animating ONLY an overlaying outgoing card.
   2) Keeping base stack static (no re-keys) during the flip.
   3) Updating index AFTER the outgoing animation ends.
   ===================================================== */
function HeroSlidesStacked() {
  const [index, setIndex] = useState(0)
  const [animDir, setAnimDir] = useState<Dir>("next")
  const [isAnimating, setIsAnimating] = useState(false)
  const [outgoing, setOutgoing] = useState<number | null>(null)
  const autoplayPaused = useRef(false)

  const len = heroPins.length

  // Compute current stack from the "settled" index only
  const order = useMemo(() => {
    const top = index % len
    const mid = (index + 1) % len
    const back = (index + 2) % len
    return [top, mid, back]
  }, [index, len])

  const requestFlip = (dir: Dir) => {
    if (isAnimating) return
    autoplayPaused.current = true
    setAnimDir(dir)
    setOutgoing(index) // capture which image is leaving
    setIsAnimating(true)
  }

  // Autoplay
  useInterval(() => {
    if (!isAnimating && !autoplayPaused.current) requestFlip("next")
  }, INTERVAL_MS)

  const handleOutgoingEnd = () => {
    // Advance the base stack AFTER the outgoing top finishes
    setIndex((i) => (animDir === "next" ? (i + 1) % len : (i - 1 + len) % len))
    setIsAnimating(false)
    setOutgoing(null)
    // Small grace period before autoplay resumes
    setTimeout(() => (autoplayPaused.current = false), 150)
  }

  return (
    <>
      <style jsx>{`
        @keyframes topOutNextFade {
          0% { transform: translate(0,0) rotate(-1deg) scale(1); opacity: 1; }
          60% { transform: translate(60px,-16px) rotate(7deg) scale(1.02); opacity: 0.6; }
          100% { transform: translate(120px,-28px) rotate(12deg) scale(0.95); opacity: 0; }
        }
        @keyframes topOutPrevFade {
          0% { transform: translate(0,0) rotate(-1deg) scale(1); opacity: 1; }
          60% { transform: translate(-60px,-16px) rotate(-7deg) scale(1.02); opacity: 0.6; }
          100% { transform: translate(-120px,-28px) rotate(-12deg) scale(0.95); opacity: 0; }
        }
      `}</style>

      <div className="relative h-[320px] sm:h-[380px] md:h-[440px] lg:h-[520px] select-none overflow-visible">
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          {/* Base stack (no animations). These do NOT re-key during a flip. */}
          <StaticCard img={heroPins[order[2]]} depth="back" />
          <StaticCard img={heroPins[order[1]]} depth="mid" />
          <StaticCard img={heroPins[order[0]]} depth="top" />

          {/* Outgoing overlay with one-time animation */}
          {isAnimating && outgoing !== null && (
            <AnimatedOutgoingCard
              key={`out-${outgoing}-${animDir}`} // ensures fresh animation each flip
              img={heroPins[outgoing]}
              dir={animDir}
              onEnd={handleOutgoingEnd}
            />
          )}
        </div>
      </div>
    </>
  )
}

function StaticCard({
  img,
  depth,
}: {
  img: { src: string; alt: string }
  depth: "top" | "mid" | "back"
}) {
  const stylesByDepth: Record<typeof depth, string> = {
    back: "z-0 scale-[0.9] translate-y-6 -rotate-3 translate-x-3 opacity-100",
    mid: "z-10 scale-[0.96] -translate-y-1 rotate-2 -translate-x-2 opacity-100",
    top: "z-20 scale-100 -rotate-1 translate-x-1 opacity-100",
  }
  const frame = "absolute w-[85%] sm:w-[80%] md:w-[78%] lg:w-[75%] aspect-[4/5] rounded-xl shadow-2xl ring-1 ring-black/10 bg-white overflow-hidden"
  return (
    <div className={`${frame} ${stylesByDepth[depth]}`}>
      {/* Using native img for simpler animated layering */}
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover rounded-md" />
    </div>
  )
}

function AnimatedOutgoingCard({
  img,
  dir,
  onEnd,
}: {
  img: { src: string; alt: string }
  dir: Dir
  onEnd: () => void
}) {
  const frame =
    "absolute w-[85%] sm:w-[80%] md:w-[78%] lg:w-[75%] aspect-[4/5] rounded-xl shadow-2xl ring-1 ring-black/10 bg-white overflow-hidden z-30 scale-100 -rotate-1 translate-x-1"

  const anim =
    dir === "next"
      ? "animate-[topOutNextFade_520ms_ease-in_forwards]"
      : "animate-[topOutPrevFade_520ms_ease-in_forwards]"

  return (
    <div
      className={`${frame} ${anim}`}
      onAnimationEnd={(e) => {
        // Safety: only handle our topOut animations
        if (
          e.animationName.includes("topOutNextFade") ||
          e.animationName.includes("topOutPrevFade")
        ) {
          onEnd()
        }
      }}
    >
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover rounded-md" />
    </div>
  )
}

/* ---------- Main Page ---------- */
export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f8] via-white to-[#f0f6ff] text-slate-900">
      {/* Global keyframes for on-load animations */}
      <style jsx global>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes softPop {
          0% { opacity: 0; transform: scale(0.96) rotate(-1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>

      <Header />

      {/* Hero Section */}
      <section className="min-h-[80vh] md:min-h-screen flex items-center py-16 md:py-20 px-4 -mt-8 md:-mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left */}
            <div>
              <h1
                className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${
                  isLoaded
                    ? "motion-safe:animate-[fadeUp_700ms_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0"
                    : "opacity-0"
                }`}
              >
                Connect Local Businesses with
                <span className="text-[#FF255A]">{" "}Content Creators</span>
              </h1>
              <div
                className={`max-w-md ${
                  isLoaded
                    ? "motion-safe:animate-[slideIn_650ms_300ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:opacity-100"
                    : "opacity-0"
                }`}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by location (e.g., Seattle, Austin, LA)"
                    className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-rose-500 rounded-xl shadow-sm"
                  />
                </div>
              </div>

              <div
                className={`mt-8 flex gap-4 ${
                  isLoaded
                    ? "motion-safe:animate-[slideIn_600ms_500ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:opacity-100"
                    : "opacity-0"
                }`}
              >
                <Button
                  size="lg"
                  className="bg-[#FF255A] hover:bg-[#e01f4e] transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Right */}
            <div
              className={`w-full ${
                isLoaded
                  ? "motion-safe:animate-[softPop_700ms_250ms_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:opacity-100"
                  : "opacity-0"
              }`}
            >
              <div className="relative rounded-2xl overflow-visible shadow-none px-16">
                <HeroSlidesStacked />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Points */}
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-16">
        <section className="rounded-[36px] border border-white/80 bg-white/70 px-6 py-12 shadow-[0_22px_70px_rgba(15,23,42,0.12)]">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Why the old playbook fails</h2>
            <p className="text-sm text-slate-500">
              Consumers crave authenticity, small businesses lack budget, and new creators can't break into the club. BroadCast closes all three gaps.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <article
                key={point.stat}
                className="rounded-[30px] bg-gradient-to-br from-white via-rose-50/50 to-white p-6 shadow-[0_18px_46px_rgba(244,63,94,0.15)]"
              >
                <p className="text-4xl font-semibold text-rose-500">{point.stat}</p>
                <p className="mt-3 text-sm text-slate-600">{point.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Featured Boards */}
        <section className="rounded-[40px] bg-[#ffe2ec] px-6 py-14">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-rose-600 sm:text-4xl">
              Why this matters for creators and small businesses
            </h2>
            <p className="text-sm text-rose-600/80">
              Each board is a real example of everyday people teaming up with neighborhood brands to make content that really moves the needle.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBoards.map((board) => (
              <article
                key={board.title}
                className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${board.accent} p-4 shadow-[0_16px_60px_rgba(190,24,93,0.12)] transition-transform hover:-translate-y-1`}
              >
                <div className="relative mb-4 overflow-hidden rounded-[28px]">
                  <Image src={board.image} alt={board.title} width={360} height={260} className="h-44 w-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-rose-600">{board.title}</h3>
                <p className="mt-2 text-sm text-rose-500/80">{board.subtitle}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Color Stories */}
        {colorStories.map((story) => (
          <section
            key={story.title}
            className={`relative overflow-hidden rounded-[44px] ${story.backdrop} px-8 py-16 shadow-[0_28px_90px_rgba(15,23,42,0.12)]`}
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <span className={`text-sm font-semibold uppercase tracking-[0.28em] ${story.accent}`}>
                  {story.eyebrow}
                </span>
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{story.title}</h2>
                <p className="max-w-lg text-sm text-slate-600">{story.body}</p>
                <Button
                  variant="outline"
                  className="rounded-full border-white/80 bg-white/70 px-6 text-sm font-semibold text-rose-500 backdrop-blur hover:bg-white"
                  asChild
                >
                  <Link href={story.action.href}>{story.action.label}</Link>
                </Button>
              </div>
              <div className="relative grid gap-6 sm:grid-cols-2">
                {story.collage.map((image, index) => (
                  <div
                    key={image}
                    className={`relative overflow-hidden rounded-[40px] border border-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.15)] ${
                      index % 2 === 0 ? "translate-y-6" : ""
                    }`}
                  >
                    <Image src={image} alt="Story collage" width={420} height={320} className="h-56 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/70 bg-white/80 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 text-center text-sm text-slate-500">
          <div className="flex flex-wrap justify-center gap-4 font-semibold text-slate-600">
            <Link href="/help" className="hover:text-rose-500">
              Help
            </Link>
            <Link href="/privacy" className="hover:text-rose-500">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-rose-500">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-rose-500">
              Contact
            </Link>
          </div>
          <p>© {new Date().getFullYear()} BroadCast — small creators, big neighborhood impact.</p>
        </div>
      </footer>
    </div>
  )
}
