export interface District {
  name: string;
  lat: number;
  lng: number;
  temperature: number; // °C
  pm25: number; // AQI
  heat: number; // 0-1 intensity
}

// 26 อำเภอของจังหวัดขอนแก่น (ข้อมูลจำลอง)
export const districts: District[] = [
  { name: "เมืองขอนแก่น", lat: 16.4397, lng: 102.8275, temperature: 36, pm25: 78, heat: 0.95 },
  { name: "บ้านฝาง", lat: 16.4711, lng: 102.6647, temperature: 34, pm25: 42, heat: 0.45 },
  { name: "พระยืน", lat: 16.3186, lng: 102.6644, temperature: 33, pm25: 38, heat: 0.4 },
  { name: "หนองเรือ", lat: 16.5128, lng: 102.4475, temperature: 32, pm25: 35, heat: 0.35 },
  { name: "ชุมแพ", lat: 16.5450, lng: 102.0975, temperature: 35, pm25: 65, heat: 0.85 },
  { name: "สีชมพู", lat: 16.7544, lng: 102.0617, temperature: 31, pm25: 28, heat: 0.25 },
  { name: "น้ำพอง", lat: 16.6878, lng: 102.8639, temperature: 34, pm25: 52, heat: 0.6 },
  { name: "อุบลรัตน์", lat: 16.7717, lng: 102.6225, temperature: 30, pm25: 22, heat: 0.2 },
  { name: "กระนวน", lat: 16.7167, lng: 103.0833, temperature: 33, pm25: 40, heat: 0.4 },
  { name: "บ้านไผ่", lat: 16.0567, lng: 102.7297, temperature: 35, pm25: 70, heat: 0.88 },
  { name: "เปือยน้อย", lat: 15.9772, lng: 102.8761, temperature: 32, pm25: 32, heat: 0.3 },
  { name: "พล", lat: 15.8158, lng: 102.6294, temperature: 34, pm25: 48, heat: 0.5 },
  { name: "แวงใหญ่", lat: 16.0167, lng: 102.5333, temperature: 33, pm25: 36, heat: 0.35 },
  { name: "แวงน้อย", lat: 15.8939, lng: 102.4683, temperature: 33, pm25: 33, heat: 0.32 },
  { name: "หนองสองห้อง", lat: 15.7575, lng: 102.8472, temperature: 34, pm25: 45, heat: 0.45 },
  { name: "ภูเวียง", lat: 16.6603, lng: 102.3672, temperature: 30, pm25: 25, heat: 0.22 },
  { name: "มัญจาคีรี", lat: 16.1869, lng: 102.4642, temperature: 33, pm25: 38, heat: 0.38 },
  { name: "ชนบท", lat: 16.0833, lng: 102.5667, temperature: 33, pm25: 40, heat: 0.4 },
  { name: "เขาสวนกวาง", lat: 16.8761, lng: 102.7639, temperature: 31, pm25: 28, heat: 0.28 },
  { name: "ภูผาม่าน", lat: 16.7333, lng: 101.9833, temperature: 29, pm25: 20, heat: 0.18 },
  { name: "ซำสูง", lat: 16.6500, lng: 103.0000, temperature: 32, pm25: 30, heat: 0.3 },
  { name: "โคกโพธิ์ไชย", lat: 16.1500, lng: 102.5167, temperature: 33, pm25: 34, heat: 0.33 },
  { name: "หนองนาคำ", lat: 16.7000, lng: 102.2333, temperature: 30, pm25: 24, heat: 0.22 },
  { name: "บ้านแฮด", lat: 16.2167, lng: 102.7833, temperature: 34, pm25: 44, heat: 0.5 },
  { name: "โนนศิลา", lat: 15.9000, lng: 102.6500, temperature: 33, pm25: 36, heat: 0.35 },
  { name: "เวียงเก่า", lat: 16.6500, lng: 102.3000, temperature: 30, pm25: 23, heat: 0.2 },
];

// ขอบเขตคร่าวๆ ของจังหวัดขอนแก่น (SW, NE)
export const khonKaenBounds: [[number, number], [number, number]] = [
  [15.6, 101.8],
  [17.0, 103.3],
];

export const khonKaenCenter: [number, number] = [16.4397, 102.8275];

// สีตามอุณหภูมิ
export function tempColor(t: number): string {
  if (t >= 36) return "#dc2626";
  if (t >= 34) return "#f97316";
  if (t >= 32) return "#facc15";
  if (t >= 30) return "#22c55e";
  return "#06b6d4";
}

// สีตาม PM2.5 AQI
export function pm25Color(v: number): string {
  if (v <= 25) return "#10b981"; // ดีมาก
  if (v <= 50) return "#84cc16"; // ดี
  if (v <= 75) return "#f59e0b"; // ปานกลาง
  if (v <= 100) return "#f97316"; // เริ่มมีผลกระทบ
  return "#dc2626"; // อันตราย
}

export function pm25Label(v: number): string {
  if (v <= 25) return "ดีมาก";
  if (v <= 50) return "ดี";
  if (v <= 75) return "ปานกลาง";
  if (v <= 100) return "เริ่มมีผลกระทบ";
  return "อันตราย";
}

export function heatLabel(v: number): string {
  if (v >= 0.8) return "สูงมาก";
  if (v >= 0.6) return "สูง";
  if (v >= 0.4) return "ปานกลาง";
  if (v >= 0.2) return "ต่ำ";
  return "ต่ำมาก";
}
