"use client";

import { useEffect, useRef, useState } from "react";
import type { Listing } from "./listings";

interface Props {
  listings: Listing[];
  activeId: number | null;
  onSelect: (id: number | null) => void;
}

// Keep Leaflet types available after first import
type LeafletType = typeof import("leaflet");
let L: LeafletType | null = null;

export default function MapPanel({ listings, activeId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Map<number, import("leaflet").Marker>>(new Map());
  const [ready, setReady] = useState(false);

  // ── Load Leaflet + initialise map once ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      // Lazy-load Leaflet (client only)
      if (!L) L = (await import("leaflet")).default ?? (await import("leaflet"));

      if (cancelled || !containerRef.current) return;

      // Fix broken default icon URLs in bundled environments
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [17.455, 78.38],
        zoom: 13,
        zoomControl: false,
        attributionControl: true,
      });

      // CartoDB dark-matter tiles — no API key needed
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      mapRef.current = map;
      setReady(true);
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current.clear();
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync markers whenever listings OR ready state changes ────────────────
  useEffect(() => {
    if (!ready || !mapRef.current || !L) return;

    // Remove stale markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    listings.forEach((l) => {
      const marker = L!.marker([l.lat, l.lng], {
        icon: makeIcon(L!, l, l.id === activeId),
      }).addTo(mapRef.current!);

      marker.on("click", () => onSelect(l.id));
      markersRef.current.set(l.id, marker);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, listings]);

  // ── Update active marker style without re-creating all markers ───────────
  useEffect(() => {
    if (!ready || !L) return;

    markersRef.current.forEach((marker, id) => {
      const listing = listings.find((l) => l.id === id);
      if (!listing) return;
      const isActive = id === activeId;
      marker.setIcon(makeIcon(L!, listing, isActive));
      marker.setZIndexOffset(isActive ? 1000 : 0);
      if (isActive) {
        mapRef.current?.panTo([listing.lat, listing.lng], {
          animate: true,
          duration: 0.5,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, ready]);

  return (
    <div className="relative flex-1 min-w-0 h-full">
      {/* Map container — must have explicit dimensions for Leaflet */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Loading shimmer */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#00ff87]/30 border-t-[#00ff87] animate-spin" />
            <p className="text-white/30 text-xs">Loading map…</p>
          </div>
        </div>
      )}

      {/* No results overlay */}
      {ready && listings.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white/30 text-sm bg-[#0a0a0a]/70 px-4 py-2 rounded-full">
            No listings in this area
          </p>
        </div>
      )}
    </div>
  );
}

// ── Custom rent-pill marker ──────────────────────────────────────────────────
function makeIcon(L: LeafletType, listing: Listing, active: boolean) {
  const bg = active
    ? "linear-gradient(135deg,#00ff87,#60efff)"
    : listing.verified
    ? "rgba(0,255,135,0.15)"
    : "rgba(255,255,255,0.08)";

  const color = active
    ? "#0a0a0a"
    : listing.verified
    ? "#00ff87"
    : "rgba(255,255,255,0.55)";

  const border = active
    ? "none"
    : listing.verified
    ? "1.5px solid rgba(0,255,135,0.45)"
    : "1.5px solid rgba(255,255,255,0.12)";

  const rent = `₹${Math.round(listing.rent / 1000)}K`;

  const html = `
    <div style="
      display:inline-flex;
      align-items:center;
      padding:4px 10px;
      border-radius:999px;
      background:${bg};
      color:${color};
      border:${border};
      font-weight:700;
      font-size:11px;
      white-space:nowrap;
      box-shadow:0 2px 10px rgba(0,0,0,0.6);
      backdrop-filter:blur(8px);
      transform:${active ? "scale(1.15)" : "scale(1)"};
      transition:transform 0.15s;
      cursor:pointer;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    ">${rent}</div>`;

  return L.divIcon({
    html,
    className: "",
    iconSize: undefined,
    iconAnchor: [20, 14],
  });
}
