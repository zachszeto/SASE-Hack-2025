"use client"

import { useCallback, useEffect, useRef } from "react"
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import Image from "next/image"
import { MapPin, ShoppingBag, Smartphone, Sparkles, Users } from "lucide-react"

import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

type Coordinate = [number, number]

type CreatorPoint = {
  id: string
  kind: "creator"
  name: string
  focus: string
  platform: string
  followers: string
  location: string
  position: Coordinate
  imageUrl: string
  tags: string[]
  pinSize: "sm" | "md" | "lg"
}

type BusinessPoint = {
  id: string
  kind: "business"
  name: string
  category: string
  location: string
  position: Coordinate
  imageUrl: string
  tags: string[]
  pinSize: "sm" | "md" | "lg"
}

type MapPoint = CreatorPoint | BusinessPoint

interface LeafletMapProps {
  center: Coordinate
  visiblePoints: MapPoint[]
  onPointAction: (point: MapPoint) => void
  onPointSelect?: (point: MapPoint) => void
  onPointHover?: (pointId: string | null) => void
  selectedPointId?: string | null
  hoveredPointId?: string | null
}

function FitBounds({
  points,
  fallbackCenter,
  focusedPointId,
}: {
  points: MapPoint[]
  fallbackCenter: Coordinate
  focusedPointId?: string | null
}) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    if (focusedPointId) {
      return
    }

    if (!points.length) {
      map.setView(fallbackCenter, 12)
      return
    }

    const bounds = L.latLngBounds(points.map((point) => point.position))

    if (points.length === 1) {
      map.flyTo(bounds.getCenter(), 14, { animate: true, duration: 1.2 })
    } else {
      map.fitBounds(bounds.pad(0.1), {
        paddingTopLeft: [40, 80],
        paddingBottomRight: [40, 60],
        maxZoom: 14,
        animate: true,
      })
    }
  }, [map, points, fallbackCenter, focusedPointId])

  return null
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function MapInitializer({ onReady }: { onReady: (map: L.Map) => void }) {
  const map = useMap()

  useEffect(() => {
    onReady(map)
  }, [map, onReady])

  return null
}

export default function LeafletMap({
  center,
  visiblePoints,
  onPointAction,
  onPointSelect,
  onPointHover,
  selectedPointId,
  hoveredPointId,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const lastSelectedId = useRef<string | null>(null)
  const handleMapReady = useCallback((map: L.Map) => {
    mapRef.current = map
  }, [])
  
  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") {
      return
    }

    const mapInstance = mapRef.current
    const resizeObserver = new window.ResizeObserver(() => {
      mapInstance.invalidateSize()
    })

    const element = mapInstance.getContainer()
    resizeObserver.observe(element)

    const timeoutId = window.setTimeout(() => {
      mapInstance.invalidateSize()
    }, 100)

    const tilePane = mapInstance.getPane("tilePane")
    tilePane?.classList.add("tile-pane-muted")

    return () => {
      window.clearTimeout(timeoutId)
      resizeObserver.disconnect()
      tilePane?.classList.remove("tile-pane-muted")
    }
  }, [])

  useEffect(() => {
    console.log("LeafletMap received visiblePoints:", visiblePoints.map(p => ({ id: p.id, kind: p.kind })))
  }, [visiblePoints])

  useEffect(() => {
    if (!mapRef.current) return

    if (!selectedPointId) {
      lastSelectedId.current = null
      return
    }

    if (lastSelectedId.current === selectedPointId) {
      return
    }

    const target = visiblePoints.find((point) => point.id === selectedPointId)
    if (!target) return

    lastSelectedId.current = selectedPointId
    const currentZoom = mapRef.current.getZoom()
    const nextZoom = currentZoom < 14 ? 14 : currentZoom
    mapRef.current.flyTo(target.position, nextZoom, {
      animate: true,
      duration: 0.8,
    })
  }, [selectedPointId, visiblePoints])

  const createMarkerIcon = useCallback(
    (point: MapPoint, options: { isActive?: boolean; isDimmed?: boolean } = {}) => {
    const { isActive = false, isDimmed = false } = options
    const safeName = escapeHtml(point.name)
    const size = point.pinSize ?? "md"
    const primaryTag = point.tags[0] ? escapeHtml(point.tags[0]) : ""

    const sizeConfig: Record<typeof size, { iconSize: [number, number]; iconAnchor: [number, number]; popupAnchor: [number, number] }> = {
      sm: { iconSize: [108, 148], iconAnchor: [54, 136], popupAnchor: [0, -118] },
      md: { iconSize: [122, 168], iconAnchor: [61, 154], popupAnchor: [0, -132] },
      lg: { iconSize: [138, 188], iconAnchor: [69, 174], popupAnchor: [0, -148] },
      }

      const dimensions = sizeConfig[size]

      return L.divIcon({
        html: `
          <div class="pinboard-card" data-size="${size}">
            <div class="pinboard-card__image">
              ${primaryTag ? `<span class="pinboard-card__tag">${primaryTag}</span>` : ""}
              <span class="pinboard-card__save" aria-hidden="true">&#9825;</span>
              <img src="${point.imageUrl}" alt="${safeName}" loading="lazy" />
              <div class="pinboard-card__overlay"></div>
              <span class="pinboard-card__name">${safeName}</span>
            </div>
          </div>
        `,
        className: `leaflet-div-icon pinboard-icon ${isActive ? "is-active" : ""} ${
          isDimmed ? "is-dimmed" : ""
        }`,
        iconSize: dimensions.iconSize,
        iconAnchor: dimensions.iconAnchor,
        popupAnchor: dimensions.popupAnchor,
      })
    },
    [],
  )

  const createClusterIcon = useCallback((cluster: L.MarkerCluster) => {
    const childCount = cluster.getChildCount()
    const childMarkers = cluster.getAllChildMarkers() as L.Marker[]

    let creatorCount = 0
    let businessCount = 0

    childMarkers.forEach((marker) => {
      const className = marker.options.icon?.options?.className ?? ""
      if (className.includes("pinboard-icon--creator")) {
        creatorCount += 1
      } else if (className.includes("pinboard-icon--business")) {
        businessCount += 1
      }
    })

    const hasMix = creatorCount > 0 && businessCount > 0
    const background = hasMix
      ? "linear-gradient(135deg, rgba(236,72,153,0.92) 0%, rgba(79,70,229,0.92) 100%)"
      : creatorCount
        ? "rgba(236,72,153,0.92)"
        : "rgba(79,70,229,0.92)"
    const label = childCount > 99 ? "99+" : String(childCount)

    return L.divIcon({
      html: `
        <div class="pinboard-cluster" style="background:${background}">
          <span>${label}</span>
        </div>
      `,
      className: "leaflet-div-icon pinboard-cluster-icon",
      iconSize: [56, 56],
      iconAnchor: [28, 28],
    })
  }, [])

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom
          zoomControl={false}
          className="h-full w-full"
        >
          <MapInitializer onReady={handleMapReady} />
          <TileLayer
            attribution='Map tiles by <a href="https://carto.com/attributions">CARTO</a>, under CC BY 3.0. Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />

          <ZoomControl position="bottomright" />

          <FitBounds points={visiblePoints} fallbackCenter={center} focusedPointId={selectedPointId} />

          <MarkerClusterGroup
            chunkedLoading
            showCoverageOnHover={false}
            spiderfyOnMaxZoom
            spiderLegPolylineOptions={{ weight: 0 }}
            iconCreateFunction={createClusterIcon}
          >
            {visiblePoints.map((point) => {
              const isActive = selectedPointId === point.id
              const isDimmed = Boolean(hoveredPointId && hoveredPointId !== point.id)

              const isCreator = point.kind === "creator"
              const detailRows = isCreator
                ? [
                    { icon: <Sparkles className="h-3.5 w-3.5 text-rose-500" />, label: point.focus },
                    { icon: <Smartphone className="h-3.5 w-3.5 text-slate-500" />, label: point.platform },
                    { icon: <Users className="h-3.5 w-3.5 text-slate-500" />, label: `${point.followers} audience` },
                  ]
                : [
                    { icon: <ShoppingBag className="h-3.5 w-3.5 text-rose-500" />, label: point.category },
                    { icon: <MapPin className="h-3.5 w-3.5 text-slate-500" />, label: point.location },
                    {
                      icon: <Sparkles className="h-3.5 w-3.5 text-slate-500" />,
                      label: point.tags[0] ?? "Local favorite",
                    },
                  ]

              return (
                <Marker
                  key={point.id}
                  position={point.position}
                  icon={createMarkerIcon(point, { isActive, isDimmed })}
                  eventHandlers={{
                    click: () => onPointSelect?.(point),
                    mouseover: () => onPointHover?.(point.id),
                    mouseout: () => onPointHover?.(null),
                  }}
                >
                  <Popup>
                    <div className="w-60 rounded-3xl bg-white/95 p-4 text-slate-700 shadow-[0_18px_46px_rgba(15,23,42,0.16)] backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow">
                          <Image
                            src={point.imageUrl}
                            alt={point.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-base font-semibold text-slate-900">{point.name}</p>
                          <p className="truncate text-xs font-medium text-slate-500">{point.location}</p>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        {detailRows.map((row, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100/70 text-rose-500">
                              {row.icon}
                            </span>
                            <span className="truncate font-medium text-slate-600">{row.label}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => onPointAction(point)}
                        className="mt-4 w-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-3 py-2 text-sm font-semibold text-white shadow transition hover:shadow-[0_16px_36px_rgba(236,72,153,0.28)]"
                      >
                        Send collab invite
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
        </MapContainer>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_65%)]" />
      </div>

      <style jsx global>{`
        .tile-pane-muted img {
          filter: saturate(0.45) contrast(0.92) brightness(1.08);
        }

        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12) !important;
          border-radius: 14px !important;
          overflow: hidden !important;
        }

        .leaflet-control-zoom a {
          background: rgba(255, 255, 255, 0.88) !important;
          color: #0f172a !important;
          border: none !important;
        }

        .leaflet-control-zoom a:hover {
          background: rgba(255, 255, 255, 1) !important;
        }

        .leaflet-container {
          font-family: "Inter", ui-sans-serif;
        }

        .pinboard-icon {
          background: transparent !important;
          border: none !important;
        }

        .pinboard-icon.is-dimmed {
          opacity: 0.42;
          filter: saturate(0.75);
        }

        .pinboard-card {
          --pinboard-width: 122px;
          --pinboard-height: 168px;
          position: relative;
          width: var(--pinboard-width);
          height: var(--pinboard-height);
          border-radius: 36px;
          transform-origin: center bottom;
          transition: transform 0.24s ease, box-shadow 0.24s ease, opacity 0.18s ease;
        }

        .pinboard-card[data-size="sm"] {
          --pinboard-width: 108px;
          --pinboard-height: 148px;
        }

        .pinboard-card[data-size="lg"] {
          --pinboard-width: 138px;
          --pinboard-height: 188px;
        }

        .pinboard-card::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          width: 3px;
          height: 28px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(15, 23, 42, 0.55) 100%);
        }

        .pinboard-card::before {
          content: "";
          position: absolute;
          left: 50%;
          top: calc(100% + 28px);
          width: 13px;
          height: 13px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.85);
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.36);
        }

        .pinboard-card__image {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          overflow: hidden;
          box-shadow: 0 24px 52px rgba(15, 23, 42, 0.22);
        }

        .pinboard-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
        }

        .pinboard-card__save {
          position: absolute;
          right: 12px;
          top: 12px;
          padding: 4px 7px;
          font-size: 14px;
          line-height: 1;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(6px);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);
          pointer-events: none;
        }

        .pinboard-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(236, 72, 153, 0) 35%, rgba(236, 72, 153, 0.78) 100%);
          opacity: 0.88;
          mix-blend-mode: multiply;
        }

        .pinboard-card__name {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 16px 14px 18px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.01em;
          text-shadow: 0 6px 18px rgba(15, 23, 42, 0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pinboard-card__tag {
          position: absolute;
          left: 12px;
          top: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #f43f5e;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.18);
        }

        .pinboard-card::before {
          background: rgba(236, 72, 153, 0.9);
          box-shadow: 0 14px 32px rgba(236, 72, 153, 0.32);
        }

        .pinboard-icon.is-active .pinboard-card,
        .pinboard-icon:hover .pinboard-card {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 36px 70px rgba(15, 23, 42, 0.28);
        }

        .pinboard-icon.is-active .pinboard-card::after {
          height: 34px;
        }

        .pinboard-cluster-icon {
          background: transparent !important;
          border: none !important;
        }

        .pinboard-cluster {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.06em;
          box-shadow: 0 26px 58px rgba(15, 23, 42, 0.28);
          border: 2px solid rgba(255, 255, 255, 0.88);
        }
      `}</style>
    </div>
  )
}
