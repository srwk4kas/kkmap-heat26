import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

interface Props {
  points: [number, number, number][];
}

export default function HeatLayer({ points }: Props) {
  const map = useMap();

  useEffect(() => {
    // @ts-expect-error - leaflet.heat extends L
    const layer = L.heatLayer(points, {
      radius: 45,
      blur: 35,
      maxZoom: 12,
      gradient: { 0.2: "#3b82f6", 0.4: "#22c55e", 0.6: "#facc15", 0.8: "#f97316", 1.0: "#dc2626" },
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}
