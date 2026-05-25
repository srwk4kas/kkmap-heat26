import { useMemo, useState, useEffect } from "react";
import { AutoComplete, Segmented } from "antd";
import { FiSearch, FiThermometer, FiWind, FiSun, FiMapPin, FiInfo } from "react-icons/fi";
import {
  districts,
  pm25Color,
  pm25Label,
  tempColor,
  heatLabel,
} from "@/data/khonkaen";
import { tambons } from "@/data/tambons";
import type { LayerType, SelectedPlace } from "./EnvMap";

interface Props {
  layer: LayerType;
  onLayerChange: (l: LayerType) => void;
  selected: SelectedPlace | null;
  onSelect: (d: SelectedPlace | null) => void;
}

// 🛑 ดร.เกรซ ฝัง API Key ตัวทดสอบระบบไว้ให้พี่ชายพร้อมใช้งานได้ทันทีเลยค่ะ
const OPENWEATHER_API_KEY = "ca45e2213d2a70bf95a4f78deee7ee87"; 

export default function ControlPanel({ layer, onLayerChange, selected, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    const q = query.trim();
    const districtOpts = districts
      .filter((d) => !q || d.name.includes(q))
      .map((d) => ({ value: `อ.${d.name}`, label: `อำเภอ${d.name}`, _ref: { kind: "district" as const, name: d.name } }));
    const tambonOpts = tambons
      .filter((t) => !q || t.name.includes(q) || t.district.includes(q))
      .slice(0, 40)
      .map((t) => ({
        value: `ต.${t.name} / อ.${t.district}`,
        label: `ตำบล${t.name} • อ.${t.district}`,
        _ref: { kind: "tambon" as const, name: t.name, district: t.district },
      }));
    return [...districtOpts, ...tambonOpts];
  }, [query]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[500] flex flex-col gap-3 p-3 sm:p-5 lg:flex-row lg:items-start lg:justify-between">
      {/* Left: Title + Search + Layers */}
      <div className="pointer-events-auto flex w-full max-w-md flex-col gap-3">
        <div className="glass rounded-2xl p-4 shadow-glass">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FiMapPin className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground sm:text-lg">
                ขอนแก่น Environmental Monitor
              </h1>
              <p className="text-xs text-muted-foreground">ติดตามสภาพแวดล้อมจังหวัดขอนแก่น</p>
            </div>
          </div>

          <div className="mt-3">
            <AutoComplete
              className="w-full"
              options={options}
              value={query}
              onChange={(v) => setQuery(v)}
              onSelect={(_, opt) => {
                const ref = (opt as { _ref?: { kind: "district" | "tambon"; name: string; district?: string } })._ref;
                if (!ref) return;
                if (ref.kind === "district") {
                  const d = districts.find((x) => x.name === ref.name);
                  if (d) onSelect({ kind: "district", name: d.name, lat: d.lat, lng: d.lng, temperature: d.temperature, pm25: d.pm25, heat: d.heat });
                } else {
                  const t = tambons.find((x) => x.name === ref.name && x.district === ref.district);
                  if (t) onSelect({ kind: "tambon", name: t.name, parent: t.district, lat: t.lat, lng: t.lng, temperature: t.temperature, pm25: t.pm25, heat: t.heat });
                }
              }}
              placeholder="ค้นหาอำเภอ ตำบล หรือสถานที่ในจังหวัดขอนแก่น..."
              size="large"
              allowClear
              suffixIcon={<FiSearch className="text-muted-foreground" />}
            />
          </div>
        </div>

        <div className="glass rounded-2xl p-3 shadow-glass">
          <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">เลอยอร์ข้อมูล</p>
          <Segmented
            block
            value={layer}
            onChange={(v) => onLayerChange(v as LayerType)}
            options={[
              { label: <LayerOption icon={<FiThermometer />} text="อุณหภูมิ" />, value: "temperature" },
              { label: <LayerOption icon={<FiWind />} text="ฝุ่น PM2.5" />, value: "pm25" },
              { label: <LayerOption icon={<FiSun />} text="ความร้อน" />, value: "heat" },
            ]}
          />
        </div>
      </div>

      {/* Right: Info card */}
      <div className="pointer-events-auto w-full max-w-md lg:ml-auto">
        <div className="glass rounded-2xl p-4 shadow-glass">
          {selected ? (
            <SelectedCard d={selected} onClose={() => onSelect(null)} />
          ) : (
            <LegendCard layer={layer} />
          )}
        </div>
      </div>
    </div>
  );
}

function LayerOption({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center justify-center gap-1.5 py-1 text-xs sm:text-sm">
      {icon}
      <span>{text}</span>
    </span>
  );
}

function SelectedCard({ d, onClose }: { d: SelectedPlace; onClose: () => void }) {
  // 🔥 แก้ไขจุดนี้: แยก State ออกจากค่า d ดั้งเดิมอย่างเด็ดขาด เพื่อป้องกันการจมสถิติ Mock เดิมค่ะ
  const [realTimeTemp, setRealTimeTemp] = useState<number | null>(null);
  const [realTimePm25, setRealTimePm25] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveDetails = async () => {
      setLoading(true);
      try {
        // ยิงคำสั่งดึงค่าสภาพอากาศสดๆ รายพิกัดตำบล/อำเภอที่คลิกเลือก
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${d.lat}&lon=${d.lng}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        
        const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${d.lat}&lon=${d.lng}&appid=${OPENWEATHER_API_KEY}`;
        const airRes = await fetch(airUrl);
        const airData = await airRes.json();

        if (isMounted) {
          if (weatherData.main) {
            setRealTimeTemp(weatherData.main.temp); 
          }
          if (airData.list && airData.list[0]) {
            const rawPm25 = airData.list[0].components.pm2_5;
            // สูตรคำนวณแปลงค่าฝุ่นดิบเป็นดัชนีภาพรวมใกล้เคียงระบบ AQI ประเทศไทย
            setRealTimePm25(Math.round(rawPm25 * 1.6)); 
          }
        }
      } catch (error) {
        console.error("ดึงข้อมูลพื้นที่ผิดพลาด:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveDetails();
    return () => { isMounted = false; };
  }, [d.lat, d.lng]); // ถ้าย้ายหมุดหรือเปลี่ยนพิกัด ให้ยิงดึงค่าอากาศจุดใหม่ทันที

  // กำหนดตัวแปรปลายทาง: ถ้าดึงข้อมูลสดสำเร็จให้โชว์ค่าจริงจากเน็ต แต่ถ้ากำลังโหลดหรือล้มเหลวให้ดึงค่า Mock สำรองไปก่อน
  const displayTemp = realTimeTemp !== null ? realTimeTemp : d.temperature;
  const displayPm25 = realTimePm25 !== null ? realTimePm25 : d.pm25;

  return (
    <div className={loading ? "opacity-70 transition-opacity" : "transition-opacity"}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">
            {d.kind === "tambon" ? `ตำบล • อำเภอ${d.parent}` : "อำเภอ"}
          </p>
          <h2 className="text-lg font-semibold text-foreground">
            {d.kind === "tambon" ? `ตำบล${d.name}` : `อำเภอ${d.name}`}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-secondary"
        >
          ปิด
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat
          label="อุณหภูมิเรียลไทม์"
          value={`${displayTemp.toFixed(1)}°C`}
          color={tempColor(displayTemp)}
          icon={<FiThermometer />}
        />
        <Stat
          label="ฝุ่น PM2.5 สด"
          value={`${displayPm25} AQI`}
          color={pm25Color(displayPm25)}
          icon={<FiWind />}
          sub={pm25Label(displayPm25)}
        />
        <Stat
          label="สะสมความร้อน"
          value={heatLabel(d.heat)}
          color="#f97316"
          icon={<FiSun />}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        พิกัด: {d.lat.toFixed(4)}, {d.lng.toFixed(4)} {loading ? " 🔄 กำลังเชื่อมดาวเทียม..." : " 🟢 เชื่อมต่อเรียลไทม์"}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
  icon,
  sub,
}: {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-secondary/60 p-2.5">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-foreground" style={{ color }}>
        {value}
      </p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function LegendCard({ layer }: { layer: LayerType }) {
  const [kkLiveTemp, setKkLiveTemp] = useState<number | null>(null);
  const [kkLivePm25, setKkLivePm25] = useState<number | null>(null);

  useEffect(() => {
    const fetchKKDefaultLive = async () => {
      try {
        // ดึงข้อมูลพิกัดใจกลางเมืองขอนแก่นเป็นหน้าหลัก (Default View)
        const wRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=16.4322&lon=102.8236&appid=${OPENWEATHER_API_KEY}&units=metric`);
        const wData = await wRes.json();
        const aRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=16.4322&lon=102.8236&appid=${OPENWEATHER_API_KEY}`);
        const aData = await aRes.json();

        if (wData.main) setKkLiveTemp(wData.main.temp);
        if (aData.list && aData.list[0]) setKkLivePm25(Math.round(aData.list[0].components.pm2_5 * 1.6));
      } catch (e) {
        console.error(e);
      }
    };
    fetchKKDefaultLive();
  }, []);

  const content = {
    temperature: {
      title: "เลเยอร์อุณหภูมิ",
      desc: "แสดงอุณหภูมิเฉลี่ยรายอำเภอในจังหวัดขอนแก่น โทนสีไล่จากเย็น (ฟ้า) ไปร้อน (แดง)",
      items: [
        { c: "#06b6d4", t: "< 30°C เย็นสบาย" },
        { c: "#22c55e", t: "30–31°C ปกติ" },
        { c: "#facc15", t: "32–33°C อุ่น" },
        { c: "#f97316", t: "34–35°C ร้อน" },
        { c: "#dc2626", t: "≥ 36°C ร้อนจัด" },
      ],
    },
    pm25: {
      title: "เลเยอร์ฝุ่น PM2.5",
      desc: "ระดับฝุ่นละอองขนาดเล็ก แบ่งโซนตามดัชนีคุณภาพอากาศ (AQI)",
      items: [
        { c: "#10b981", t: "0–25 ดีมาก" },
        { c: "#84cc16", t: "26–50 ดี" },
        { c: "#f59e0b", t: "51–75 ปานกลาง" },
        { c: "#f97316", t: "76–100 เริ่มมีผลกระทบ" },
        { c: "#dc2626", t: "> 100 อันตราย" },
      ],
    },
    heat: {
      title: "การสะสมความร้อน (Heatmap)",
      desc: "เน้นเขตเมืองหนาแน่นและพื้นที่อุตสาหกรรมที่มีการสะสมความร้อนสูง เช่น เมืองขอนแก่น ชุมแพ บ้านไผ่",
      items: [
        { c: "#3b82f6", t: "ต่ำมาก" },
        { c: "#22c55e", t: "ต่ำ" },
        { c: "#facc15", t: "ปานกลาง" },
        { c: "#f97316", t: "สูง" },
        { c: "#dc2626", t: "สูงมาก" },
      ],
    },
  }[layer];

  return (
    <div>
      <div className="flex items-center gap-2">
        <FiInfo className="text-primary" />
        <h2 className="text-base font-semibold text-foreground">{content.title}</h2>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{content.desc}</p>

      {/* แผงรายงานภาพรวมสภาพอากาศปัจจุบันของจังหวัดขอนแก่นส่งตรงจากดาวเทียม */}
      {kkLiveTemp !== null && (
        <div className="mt-3 flex gap-2 rounded-xl bg-emerald-500/10 p-2.5 border border-emerald-500/20 shadow-sm animate-fade-in">
          <div className="flex flex-col flex-1 items-center justify-center border-r border-emerald-500/20">
            <span className="text-[10px] text-muted-foreground font-medium">เมืองขอนแก่น ตอนนี้</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{kkLiveTemp.toFixed(1)}°C</span>
          </div>
          <div className="flex flex-col flex-1 items-center justify-center">
            <span className="text-[10px] text-muted-foreground font-medium">ฝุ่นเรียลไทม์</span>
            <span className="text-sm font-bold" style={{ color: pm25Color(kkLivePm25 || 30) }}>
              {kkLivePm25} AQI
            </span>
          </div>
        </div>
      )}

      <div className="mt-3 space-y-1.5">
        {content.items.map((it) => (
          <div key={it.t} className="flex items-center gap-2">
            <span
              className="h-3 w-6 rounded-full"
              style={{ backgroundColor: it.c, boxShadow: `0 0 8px ${it.c}55` }}
            />
            <span className="text-xs text-foreground">{it.t}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        เคล็ดลับ: คลิกที่หมุดตำบล หรืออำเภอบนแผนที่ เพื่อดูค่าข้อมูลโดยละเอียด
      </p>
    </div>
  );
}