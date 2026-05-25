import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap, Circle } from "react-leaflet";
import { Fragment, useEffect, useMemo, useState } from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  districts,
  khonKaenBounds,
  khonKaenCenter,
} from "@/data/khonkaen";

import { tambons } from "@/data/tambons";
import HeatLayer from "./HeatLayer";

export type LayerType = "temperature" | "pm25" | "heat";

export interface SelectedPlace {
  kind: "district" | "tambon";
  name: string;
  parent?: string;
  lat: number;
  lng: number;
  temperature: number;
  pm25: number;
  heat: number;
}
interface Props {
  layer: LayerType;
  onSelect: (p: SelectedPlace) => void;
  focus: SelectedPlace | null;
}

const PROVINCE_CENTER: [number, number] = khonKaenCenter;
const PROVINCE_BOUNDS = L.latLngBounds(khonKaenBounds as any).pad(0.06);

function FocusFly({ focus }: { focus: SelectedPlace | null }) {
  const map = useMap();
  useEffect(() => {
    if (focus) {
      const z = focus.kind === "tambon" ? 13 : 12;
      map.flyTo([focus.lat, focus.lng], z, { duration: 0.8 });
    }
  }, [focus, map]);
  return null;
}

function gradient(t: number): string {
  const stops = [
    [0.0, [59, 130, 246]],   // blue
    [0.25, [34, 197, 94]],   // green
    [0.5, [250, 204, 21]],   // yellow
    [0.75, [249, 115, 22]],  // orange
    [1.0, [220, 38, 38]],    // red
  ] as const;
  const v = Math.max(0, Math.min(1, t));
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i];
    const [b, cb] = stops[i + 1];
    if (v >= a && v <= b) {
      const k = (v - a) / (b - a);
      const r = Math.round(ca[0] + (cb[0] - ca[0]) * k);
      const g = Math.round(ca[1] + (cb[1] - ca[1]) * k);
      const bl = Math.round(ca[2] + (cb[2] - ca[2]) * k);
      return `rgb(${r}, ${g}, ${bl})`;
    }
  }
  return "rgb(59,130,246)";
}

function intensityFor(layer: LayerType, t: { temperature: number; pm25: number; heat: number }): number {
  if (layer === "temperature") return (t.temperature - 28) / 10; // 28..38
  if (layer === "pm25") return t.pm25 / 120;
  return t.heat;
}

export default function EnvMap({ layer, onSelect, focus }: Props) {
  const [showTambons, setShowTambons] = useState(true);

  const heatPoints = useMemo<[number, number, number][]>(
    () => tambons.map((t) => [t.lat, t.lng, t.heat]),
    []
  );

  const renderedTambons = useMemo(() => {
    return tambons.map((t) => {
      const intensity = intensityFor(layer, t);
      const color = gradient(intensity);
      return { ...t, color };
    });
  }, [layer]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={() => setShowTambons((s) => !s)}
          className="bg-white/90 hover:bg-white text-slate-800 font-medium text-sm rounded-md shadow-md px-3 py-1.5 border border-slate-200 transition-all active:scale-95"
        >
          {showTambons ? "👁️ ซ่อนตำบล" : "👁️ แสดงตำบล"}
        </button>
      </div>

      <MapContainer
        center={PROVINCE_CENTER}
        zoom={9}
        minZoom={7}
        maxZoom={15}
        maxBounds={PROVINCE_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        <FocusFly focus={focus} />

        {layer === "heat" && <HeatLayer points={heatPoints} />}

        {districts.map((d) => (
          <CircleMarker
            key={`d-${d.name}`}
            center={[d.lat, d.lng]}
            radius={layer === "heat" ? 5 : 9}
            pathOptions={{
              color: "#0f172a",
              weight: 2,
              fillColor: "#ffffff",
              fillOpacity: 0.9,
            }}
            eventHandlers={{
              click: () =>
                onSelect({
                  kind: "district",
                  name: d.name,
                  lat: d.lat,
                  lng: d.lng,
                  temperature: d.temperature,
                  pm25: d.pm25,
                  heat: d.heat,
                }),
            }}
          />
        ))}

        {showTambons &&
          renderedTambons.map((t) => (
            <Fragment key={`wrap-${t.district}-${t.name}`}>
              {layer !== "heat" && (
                <Circle
                  center={[t.lat, t.lng]}
                  radius={Math.round(400 + t.heat * 1600)}
                  pathOptions={{
                    color: t.color,
                    weight: 0,
                    fillColor: t.color,
                    fillOpacity: Math.max(0.06, Math.min(0.6, 0.06 + t.heat * 0.5)),
                  }}
                />
              )}

              <CircleMarker
                key={`t-${t.district}-${t.name}`}
                center={[t.lat, t.lng]}
                radius={12}
                pathOptions={{
                  color: "#0f172a",
                  weight: 1,
                  fillColor: t.color,
                  fillOpacity: 0.95,
                }}
                eventHandlers={{
                  click: () =>
                    onSelect({
                      kind: "tambon",
                      name: t.name,
                      parent: t.district,
                      lat: t.lat,
                      lng: t.lng,
                      temperature: t.temperature,
                      pm25: t.pm25,
                      heat: t.heat,
                    }),
                }}
              >
                <Tooltip direction="top" opacity={0.95}>
                  <span className="text-[11px] font-medium text-slate-900">
                    ต.{t.name} <span className="text-slate-500">/ อ.{t.district}</span>
                  </span>
                </Tooltip>
              </CircleMarker>
            </Fragment>
          ))}
      </MapContainer>
    </div>
  );
}
