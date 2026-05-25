import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import ControlPanel from "@/components/ControlPanel";
import type { LayerType, SelectedPlace } from "@/components/EnvMap";

const EnvMap = lazy(() => import("@/components/EnvMap"));



export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ติดตามสภาพแวดล้อมจังหวัดขอนแก่น | Khon Kaen Environmental Monitor" },
      {
        name: "description",
        content:
          "แผนที่ติดตามอุณหภูมิ ฝุ่น PM2.5 และการสะสมความร้อน ครอบคลุมทุกอำเภอในจังหวัดขอนแก่น",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
});

function Index() {
  const [layer, setLayer] = useState<LayerType>("temperature");
  const [selected, setSelected] = useState<SelectedPlace | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {mounted && (
        <Suspense fallback={<div className="flex h-full items-center justify-center text-muted-foreground">กำลังโหลดแผนที่...</div>}>
          <EnvMap layer={layer} onSelect={setSelected} focus={selected} />
        </Suspense>
      )}
      <ControlPanel
        layer={layer}
        onLayerChange={setLayer}
        selected={selected}
        onSelect={setSelected}
      />
    </main>
  );
}

